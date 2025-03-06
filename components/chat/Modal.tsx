"use client"
import {Dialog, DialogContent, DialogOverlay} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"

export default function Modal({children}: {children: React.ReactNode}) {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleClose}>
        <DialogOverlay className="opacity-30">
          <DialogContent className=" rounded-xl mx-auto h-[85vh] w-[95%] md:h-[95vh] ">
            <DialogTitle className="hidden">
            </DialogTitle>
            {children}
          </DialogContent>
        </DialogOverlay>
    </Dialog>
  )
}

