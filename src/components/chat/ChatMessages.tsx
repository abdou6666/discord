"use client"

import { useChatQuery } from "@/hooks/useChatQuery";
import { Member, Message, Profile } from "@prisma/client";
import { format } from 'date-fns';
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import ChatItem from "./ChatItem";
import ChatWelcome from "./ChatWelcome";
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

const DATE_FORMAT = "d MMM yyyy, HH:mm";

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
                            <ChatItem
                                key={message.id}
                                id={message.id}
                                content={message.content}
                                currentMember={member}
                                member={message.member}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketQuery={socketQuery}
                                socketUrl={socketUrl}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
