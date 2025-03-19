import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const upVoteSchema = z.object({
    streamId: z.string()
})

export const POST = async (req: NextRequest) => {
    const session = await getServerSession()
    if (!session?.user?.email) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 403 }
        );
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: session.user.email 
        }
    })

    if (!user) {
        return NextResponse.json({
            message: "unauthrized"
        }, {
            status: 403
        })
    }

    try {
        const data = upVoteSchema.parse(await req.json())

        await prismaClient.upvotes.delete({
            where: {
                userId_streamId: {
                    userId: user.id,
                    streamId: data.streamId
                }
            }
        })
        return NextResponse.json({
            message:"downvote the list"
        })

    } catch (err) {
        return NextResponse.json({
            message: "this action is not allowed"
        })
    }
}