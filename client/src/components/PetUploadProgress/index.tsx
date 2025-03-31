import { delay, motion, useAnimate } from 'motion/react'
import { usePetProgress } from './petUploadProgressModel'
import { PawPrint } from 'lucide-react'

interface PetAnimationProps {
    data: ReturnType<typeof usePetProgress>
}
export function UploadPetAnimation({ data }: PetAnimationProps) {
    const { progress, paw } = data

    return (
        <motion.div
            ref={progress}
            className="w-0 absolute bottom-0 h-[3px] bg-primary color-gray-100 flex items-center justify-center"
        >
            <motion.div ref={paw} className="text-gray-100 opacity-0">
                <PawPrint fill="white" />
            </motion.div>
        </motion.div>
    )
}
