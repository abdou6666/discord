import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        })
        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json("internal error", { status: 500 })
    }
}