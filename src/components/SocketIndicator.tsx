"use client"
import { useSocket } from "@/components/providers/SocketProvider"
import { Badge } from "@/components/ui/badge"


export default function SocketIndicator() {
    const { isConnected, socket } = useSocket();
    if (!isConnected) {
        return (
            <Badge variant={'outline'} className="bg-yellow-600 text-white border-none">
                Fallback: Polling every 1s
            </Badge>
        )
    }
    return (
        <Badge variant={'outline'} className="bg-emerald-600 text-white border-none">
            Live: Real-time updates
        </Badge>
    )
}
