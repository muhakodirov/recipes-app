import { useUserContext } from "@/context/User"
import { LogOut, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function ProfileHeader() {
    const { currUser } = useUserContext()
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()
    const handleSignOut = () => {
        localStorage.removeItem("userSession");
        document.cookie = "userSession=; path=/; max-age=0";
        router.push("/");
        setTimeout(() => window.location.reload(), 500);
    }


    return (
        <>
            <div className="mb-10 sm:my-10 grid sm:grid-cols-2 sm:grid-rows-2 place-items-center items space-y-2">
                <div className=" sm:row-span-2 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full bg-slate-400">
                </div>
                <div className="self-end ">
                    <h1 className="text-2xl md:text-3xl font-semibold">{currUser?.firstname} {currUser?.lastname}</h1>
                </div>

                <div className=" self-start group">
                    <Button variant="outline"
                        className="flex items-center  w-20 h-7 mx-auto space-x-2 py-1 px-2  rounded-md"
                        onMouseEnter={() => setIsVisible(true)}
                        onMouseLeave={() => setIsVisible(false)}
                        onClick={() => router.push('/create')}
                    >
                        <Plus size={20} className="mx-auto" />
                    </Button>
                    {isVisible && (
                        <span
                            className="absolute mt-2 whitespace-nowrap px-2 py-1 rounded-md shadow-md"
                            onMouseEnter={() => setIsVisible(false)}
                        >
                            neues Rezept erstellen
                        </span>
                    )}
                </div>
                <Button
                    title="Log out"
                    onClick={handleSignOut}
                    variant="ghost"
                    className="row-start-1 sm:row-start-3 sm:row-end-4 place-self-end sm:place-self-center ">

                    <LogOut />
                </Button>
            </div>
        </>

    )
}
