"use client"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { io as ClientIO } from 'socket.io-client';

type SocketContextType = {
    socket: any | null,
    isConnected: boolean
}

const socketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
});

export function useSocket() {
    const context = useContext(socketContext)

    if (!context) {
        throw new Error('Socket provider missing')
    }

    return context;
}


export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: '/api/socket/io',
            addTrailingSlash: false
        })

        socketInstance.on('connect', () => {
            setIsConnected(true)
        })

        socketInstance.on('disconnect', () => {
            setIsConnected(false)
        })
        setSocket(socketInstance)
        return () => socketInstance.disconnect()
    }, [])

    return (
        <socketContext.Provider value={{ socket, isConnected }}>
            {children}
        </socketContext.Provider>
    )
}