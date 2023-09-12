import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessages from '@/components/chat/ChatMessages';
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    const channel = await db.channel.findFirst({
        where: {
            id: params.channelId,
        }
    })

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    })
    if (!channel || !member) {
        return redirect('/')
    }
    return (
        <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type='channel'
            />

            <ChatMessages
                member={member}
                name={channel.name}
                type='channel'
                apiUrl="/api/messages"
                socketUrl='/api/socket/messages'
                socketQuery={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
                paramKey='channelId'
                paramValue={channel.id}
                chatId={channel.id}
            />

            <ChatInput
                apiUrl='/api/socket/messages'
                type='channel'
                name={channel.name}
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
            />
        </div>
    )
}
