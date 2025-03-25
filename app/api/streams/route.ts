import { prismaClient } from '@/app/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
// @ts-expect-error: YouTubeSearchApi might not have TypeScript definitions
import youtubesearchapi from "youtube-search-api";
import { getServerSession } from 'next-auth';
const YT_regex = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export const POST = async (req: NextRequest) => {
    try {
        const data = CreateStreamSchema.parse(await req.json())
        const Yt = data.url.match(YT_regex)
        if (!Yt) {
            return NextResponse.json({
                msg: 'url is not valid'
            }, {
                status: 411
            })
        }
        const extractedId = data.url.split('?v=')[1]

        const res = await youtubesearchapi.GetVideoDetails(extractedId)

        const thumbnail = res.thumbnail.thumbnails
        const thumbnails = thumbnail.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1)//did the sorting here

        const bigImg = thumbnails[thumbnails.length - 1].url
        const smallImg = thumbnails[thumbnails.length - 2].url

        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "YouTube",
                title: res.title ?? "random title",
                bigImg: bigImg ?? '',
                smallImg: smallImg ?? '',
            }
        })

        return NextResponse.json({
            msg: "added stream",
            id: stream
        })

    } catch {
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        })
    }

}

export const GET = async (req: NextRequest) => {
    const creatoreId = req.nextUrl.searchParams.get('creatorId')
    const session = await getServerSession()
    if (!creatoreId) {
        return NextResponse.json({
            msg: "error"
        }, {
            status: 411
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    const [stream, activeStream] = await Promise.all([await prismaClient.stream.findMany({
        where: {
            userId: creatoreId,
            played: false
            userId: creatoreId,
            played: false
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes: {
                where: {
                    userId: user?.id
                }
            }
        }
    }), prismaClient.currentStream.findFirst({
        where: {
            userId: creatoreId
        },
        include: {
            stream: true
        }
    })])

    return NextResponse.json({
        stream: stream.map(({ _count, ...rest }) => ({
            ...rest,
            upvotes: _count,
            haveUpVoted: rest.upvotes.length ? true : false,
        })),
        currentStream: activeStream
    })
}