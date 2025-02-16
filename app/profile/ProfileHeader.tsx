import { useUserContext } from "@/context/User"
import { Plus } from "lucide-react"

export default function ProfileHeader() {
    const { currUser } = useUserContext()
    console.log(currUser);
    return (
        <div className="my-10 grid sm:grid-cols-2 sm:grid-rows-2 place-items-center items space-y-2">
            <div className=" sm:row-span-2 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full bg-slate-400">
            </div>
            <div className="self-end ">
                <h1 className="text-2xl md:text-3xl font-semibold">{currUser?.firstname} {currUser?.lastname}</h1>
            </div>

            <div className=" self-start">
                <button className=" flex items-center w-auto text-center space-x-2 py-1 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md">
                    <Plus size={20} /> neues Rezept
                </button>
            </div>
        </div>
    )
}
