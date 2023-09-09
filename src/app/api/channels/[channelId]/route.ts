import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return NextResponse.json("Unauthorized", { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get('serverId');

        if (!serverId) {
            return NextResponse.json("no server id", { status: 400 })
        }

        if (!params.channelId) {
            return NextResponse.json("no channel id", { status: 400 })
        }
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: {
                                equals: 'general'
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json(server, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json('internal error', { status: 500 })
    }
}