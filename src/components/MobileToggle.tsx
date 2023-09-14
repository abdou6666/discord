
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Button from "@/components/ui/button"
import NavigationSideBar from "@/components/navigations/NavigationSideBar"
import ServerSidebar from "@/app/(main)/(routes)/servers/_components/ServerSidebar"


interface MobileToggleProps {
    serverId: string,
}
export default function MobileToggle({ serverId }: MobileToggleProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size={'icon'} className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className="p-0 flex gap-0">
                <div className="W-[72px]">
                    <NavigationSideBar />
                </div>
                <ServerSidebar serverId={serverId} />
            </SheetContent>
        </Sheet>
    )
}
