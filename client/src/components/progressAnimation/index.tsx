import { motion } from 'motion/react'
import { useAnimationProgress } from './progressAnimationModel'
import { PawPrint } from 'lucide-react'

interface ProgressAnimationProps {
    percentage: string
}
export function ProgressAnimation({ percentage }: ProgressAnimationProps) {
    const { progress, paw } = useAnimationProgress(percentage)

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
