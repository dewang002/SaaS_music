import { prismaClient } from "@/app/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async() => {
    const session = await getServerSession()
    const user = await prismaClient.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    })
    
    if(!user){
        return NextResponse.json({msg: "unAuthenticated"},{status:411})
    }

    const mostUpVoted = await prismaClient.stream.findFirst({
        where: {
            userId: user.id
        },
        orderBy: {
            upvotes: {
                _count: "desc"
            }
        }
    })

    await Promise.all([prismaClient.currentStream.upsert({
        where: {
            userId: user.id
        },
        update: {
            streamId: mostUpVoted?.id
        },
        create:{
            userId: user.id,
            streamId: mostUpVoted?.id
        }
    }), 
    prismaClient.stream.delete({
        where:{
            id: mostUpVoted?.id ?? ""
        }
    })
    ])
    
    if (!mostUpVoted) {
        return NextResponse.json({ msg: "No streams found" }, { status: 404 });
    }    
    return NextResponse.json({stream: mostUpVoted})
}