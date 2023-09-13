import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic'

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return NextResponse.json("Unauthorized", { status: 401 })
        }
        if (!params.serverId) {
            return NextResponse.json('No Server Id', { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: uuidv4()
            }
        })

        return NextResponse.json(server, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json("Internal Error", { status: 500 })
    }
}