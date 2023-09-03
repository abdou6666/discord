"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";


export const InviteModal = () => {
    const { isOpen, onClose, onOpen, type } = useModal();

    const isModalOpen = isOpen && type === 'invite'


    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personnality with a name and an image.You can always change it later.
                    </DialogDescription>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )

}