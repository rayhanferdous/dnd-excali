import ControlBox from "./ControlBox"
import { Button } from "./ui/button"

const TopBar = () => {
    return (
        <nav className="flex items-center justify-between">
            <Button variant="secondary" size="icon">
                <svg
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
                </svg>
            </Button>
            <ControlBox />
            <div className="flex gap-3.5 items-center">
                <Button variant="default" size="sm">Share</Button>
                <Button variant="secondary" size="sm">Library</Button>
            </div>
        </nav>
    )
}

export default TopBar