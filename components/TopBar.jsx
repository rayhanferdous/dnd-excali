import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import ColorPicker from "./ColorPicker"
import ControlBox from "./ControlBox"
import { Button } from "./ui/button"

const TopBar = () => {

    return (<>
        <nav className="flex items-center justify-between">
            <Drawer direction="left">
                <DrawerTrigger> <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg></DrawerTrigger>

                <DrawerContent className={'px-12'} >
                    <DrawerHeader>
                        <DrawerTitle className={'text-seco'}>Fill Color</DrawerTitle>
                        <DrawerDescription>Change color easily</DrawerDescription>
                    </DrawerHeader>
                    <ColorPicker />
                </DrawerContent>
            </Drawer>
            <ControlBox />
            <div className="flex gap-3.5 items-center">
                <Button variant="default" size="sm">Share</Button>
                <Button variant="secondary" size="sm">Library</Button>
            </div>
        </nav>

    </>
    )
}

export default TopBar