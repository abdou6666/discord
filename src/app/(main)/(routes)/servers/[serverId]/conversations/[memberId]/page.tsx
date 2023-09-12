import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessages from '@/components/chat/ChatMessages';
import { getOrCreateConversation } from '@/lib/conversation';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { channel } from 'diagnostics_channel';
import { redirect } from 'next/navigation';

interface MemberIdPageProps {
    params: {
        memberId: string,
        serverId: string,
    }
}
export default async function MemberIdPage({ params }: MemberIdPageProps) {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn()
    }
    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        },
        include: {
            profile: true
        }
    })
    if (!currentMember) {
        return redirect('/')
    }

    const converation = await getOrCreateConversation(currentMember.id, params.memberId);
    if (!converation) {
        return redirect(`/servers/${params.serverId}`)
    }

    const { memberOne, memberTwo } = converation;
    const otherMember = (memberOne.profileId === profile.id) ? memberTwo : memberOne
    return (
        <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
            <ChatHeader
                imageUrl={otherMember.profile.imageUrl}
                name={otherMember.profile.name}
                serverId={otherMember.serverId}
                type='conversation'
            />
            {/* <ChatMessages
                member={currentMember}
                name={currentMember.profile.name}
                apiUrl='/api/direct-messages'
                chatId={converation.id}
                type='conversation'
                paramKey="conversationId"
                paramValue={converation.id}
                socketUrl='/api/socket/direct-messages'
                socketQuery={{
                    converationId: converation.id,
                }}
            />
            <ChatInput
                name={otherMember.profile.name}
                type='conversation'
                apiUrl='/api/socket/direct-messages'
                query={{
                    conversationId: converation.id,
                }}
            /> */}
            <ChatMessages
                member={currentMember}
                name={otherMember.profile.name}
                chatId={converation.id}
                type="conversation"
                apiUrl="/api/direct-messages"
                paramKey="conversationId"
                paramValue={converation.id}
                socketUrl="/api/socket/direct-messages"
                socketQuery={{
                    conversationId: converation.id,
                }}
            />
            <ChatInput
                name={otherMember.profile.name}
                type="conversation"
                apiUrl="/api/socket/direct-messages"
                query={{
                    conversationId: converation.id,
                }}
            />


        </div>
    )
}
