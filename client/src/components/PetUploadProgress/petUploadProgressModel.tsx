import { useAnimate } from 'motion/react'
import { useEffect, useState } from 'react'

export function usePetProgress(percentage: string) {
    const [progress, animateProgress] = useAnimate()
    const [paw, animatePaw] = useAnimate()
    const [current, setCurrent] = useState(percentage)

    useEffect(() => {
        if (!progress.current) {
            return
        }

        startAnimation()
    }, [current])
    async function startAnimation() {
        await animateProgress(
            progress.current,
            { width: current },
            {
                type: 'tween',
            }
        )
        if (current == '100%') {
            await animateProgress(
                progress.current,
                { height: '100%' },
                { duration: 0.2, type: 'tween' }
            )

            await animatePaw(
                paw.current,
                { scale: [0.4, 2, 1, 1.5, 1], opacity: 1 },
                { duration: 0.8, ease: 'linear' }
            )
            await animatePaw(
                paw.current,
                { scale: [1], opacity: 1 },
                { duration: 0.4, ease: 'linear' }
            )

            await animatePaw(paw.current, { opacity: 0 }, { duration: 0.6 })

            await animateProgress(
                progress.current,
                { height: '0%' },
                { duration: 0.5, ease: 'easeInOut' }
            )
        }
    }
    return {
        progress,
        paw,
        current,
        setCurrent,
    }
}
