import { prismaClient } from '@/app/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import {z} from 'zod'
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const YT_regex = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export const POST = async (req: NextRequest) => {
    try{
        const data = CreateStreamSchema.parse(await req.json())
        const Yt = data.url.match(YT_regex)
        if(!Yt){
           return NextResponse.json({
                msg: 'url is not valid'
            },{
                status: 411
            })
        }
        const extractedId = data.url.split('?v=')[1]
        const res = await youtubesearchapi.GetVideoDetails(extractedId)
        console.log({
            title: res.title,
            thumbnail: JSON.stringify(res.thumbnail.thumbnails)
        })
        const thumbnail = res.thumbnail.thumbnails
        const thumbnails = thumbnail.sort((a:{width:number}, b:{width:number})=> a.width < b.width ? -1: 1)//did the sorting here

        const lastone = thumbnails[thumbnails.length-1]
        const secondtwo = thumbnails[thumbnails.length-2]

        const stream = await prismaClient.stream.create({
            data:{
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "YouTube"
            }
        })
        return NextResponse.json({
            msg: "added stream",
            id: stream
        })

    }catch(err){
        console.log(err)
        return NextResponse.json({
            message: "Error while adding a stream"
        },{
            status: 411
        })
    }
        
}

export const GET = async (req:NextRequest) => {
    const creatoreId = req.nextUrl.searchParams.get('createrId')
    const stream = await prismaClient.stream.findMany({
        where: {
            userId: creatoreId ?? ""
        }
    })
    return NextResponse.json({
        stream
    })
}