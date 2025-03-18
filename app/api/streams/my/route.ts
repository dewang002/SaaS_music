import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await getServerSession(); 

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    if (!user) {
        return NextResponse.json({
            message: "UnAuthenticated"
        }, {
            status: 403
        }) 
    }

    const stream = await prismaClient.stream.findMany({
        where: {
            userId: user.id
        },
        include:{
            _count:{
                select:{
                    upvotes: true
                }
            }
        }
    })

    return NextResponse.json({
        stream : stream.map(({_count, ...rest})=>({
            ...rest,
            _count
        }))
    })
}
