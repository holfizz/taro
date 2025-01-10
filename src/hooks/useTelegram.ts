import { useEffect, useState } from 'react'

export const useTelegram = () => {
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const tg = (window as any).Telegram?.WebApp
		if (tg) {
			if (!tg.isExpanded) {
				tg.expand()
			}
			setIsReady(true)
			tg.ready()
		}
	}, [])

	const close = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((window as any).Telegram?.WebApp) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(window as any).Telegram.WebApp.close()
		}
	}

	return { isReady, close }
}
