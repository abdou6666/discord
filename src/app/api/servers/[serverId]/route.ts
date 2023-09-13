import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic'

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return NextResponse.json('Unauthorized', { status: 401 })
        }

        const { imageUrl, name } = await req.json()

        await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                imageUrl,
                name
            }
        })

        return NextResponse.json('Updated', { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Error', { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return NextResponse.json('Unauthorized', { status: 401 })
        }

        if (!params.serverId) {
            return NextResponse.json('Server id missing', { status: 400 })

        }
        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id
            }
        })

        return NextResponse.json(server, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Error', { status: 500 })
    }
}