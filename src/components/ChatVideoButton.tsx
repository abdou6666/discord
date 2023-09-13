"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import ActionToolTip from '@/components/ActionToolTip';
import { Video, VideoOff } from 'lucide-react';

export default function ChatVideoButton() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isVideo = searchParams?.get('video')

    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? 'End video call' : 'Start video call';

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true });

        router.push(url)
    }
    return (
        <ActionToolTip side='bottom' label={tooltipLabel}>
            <button onClick={onClick} className='hover:opacity-75 transition mr-4'>
                <Icon className='h-6 w-6 text-zinc-500 dark:text-zinc-400' />
            </button>
        </ActionToolTip>
    )
}
