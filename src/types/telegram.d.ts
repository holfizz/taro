interface TelegramWebApp {
	close: () => void
	sendData: (data: string) => void
	ready: () => void
	expand: () => void
	isExpanded: boolean
}

interface Telegram {
	WebApp: TelegramWebApp
}

declare global {
	interface Window {
		Telegram: Telegram
	}
}

export {}
