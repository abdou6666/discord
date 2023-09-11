"use client"

import { Member, MemberRole, Message, Profile } from "@prisma/client"
import ChatWelcome from "./ChatWelcome"
import { useChatQuery } from "@/hooks/useChatQuery"
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";

interface ChatMessagesProps {
    name: string,
    member: Member,
    chatId: string,
    apiUrl: string,
    socketUrl: string,
    socketQuery: Record<string, string>,
    paramKey: "channelId" | 'conversationId',
    paramValue: string,
    type: "channel" | "conversation",
}
type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}


export default function ChatMessages({ apiUrl, chatId, member, name, paramKey, paramValue, socketQuery, socketUrl, type }: ChatMessagesProps) {
    const queryKey = `chat:${chatId}`;

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({ apiUrl, queryKey, paramKey, paramValue });
    if (status === "loading") {
        <div className="flex flex-col flex-1 justify-center items-center">
            <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Loading messages...
            </p>
        </div>
    }
    if (status === "error") {
        <div className="flex flex-col flex-1 justify-center items-center">
            <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Loading messages...
            </p>
        </div>
    }
    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">

            <div className="flex-1" />
            <ChatWelcome
                type={type}
                name={name}
            />
            <div className=" flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <div key={message.id}>
                                {message.content}
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}