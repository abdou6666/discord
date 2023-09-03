"use client"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface ActionToolTipProps {
    label: string,
    children: ReactNode,
    side?: "top" | "right" | "left" | "bottom"
    align?: "start" | "center" | "end"
}
export default function ActionToolTip({ label, children, align, side }: ActionToolTipProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className='font-semibold text-sm capitalize'>
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
