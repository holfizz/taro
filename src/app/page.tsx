'use client'

import { useTelegram } from '@/hooks/useTelegram'
import Image from 'next/image'
import { useState } from 'react'
import { CARDS } from './constants'
import styles from './page.module.css'

export default function Home() {
	const [isStarted, setIsStarted] = useState(false)
	const [cards, setCards] = useState<string[]>([])
	const [selectedCard, setSelectedCard] = useState<string | null>(null)
	const [showReadingButton, setShowReadingButton] = useState(false)
	const { isReady } = useTelegram()

	const startReading = () => {
		if (!isStarted) {
			setIsStarted(true)
			const selectedCards = getRandomCards(6)
			setCards(selectedCards)
		}
	}

	const getRandomCards = (count: number) => {
		const shuffled = [...CARDS].sort(() => Math.random() - 0.5)
		return shuffled.slice(0, count)
	}

	const handleCardClick = (card: string) => {
		if (!selectedCard) {
			setSelectedCard(card)
			setShowReadingButton(true)
		}
	}

	const handleReadingStart = () => {
		if (isReady) {
			window.Telegram.WebApp.close()
		}
	}

	return (
		<main className={styles.main}>
			<div
				className={`${styles.background} ${
					showReadingButton ? styles.showButton : ''
				}`}
			>
				{isStarted && (
					<>
						<h1 className={styles.title}>
							{!selectedCard ? 'Выберите 1 карту' : ''}
						</h1>
						<div className={styles.cardsContainer}>
							{cards.map((card, index) => (
								<div
									key={card}
									className={`${styles.card} ${styles['cardAppear' + index]}`}
									onClick={() => handleCardClick(card)}
								>
									<div
										className={`${styles.cardInner} ${
											selectedCard === card ? styles.flipped : ''
										}`}
									>
										<div className={styles.cardFront}>
											<div className={styles.cardImageWrapper}>
												<Image
													src='/cards/back.jpg'
													alt='Рубашка карты'
													fill
													style={{ objectFit: 'cover' }}
												/>
											</div>
										</div>
										<div className={styles.cardBack}>
											<div className={styles.cardImageWrapper}>
												<Image
													src={`/cards/${card}`}
													alt='Карта Таро'
													fill
													style={{ objectFit: 'cover' }}
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				)}
				<div
					className={`${styles.deck} ${isStarted ? styles.started : ''}`}
					onClick={!isStarted ? startReading : undefined}
				>
					<div className={styles.deckGlow} />
					<div className={styles.cardStack}>
						{[...Array(15)].map((_, index) => (
							<div key={index} className={styles.stackCard} />
						))}
					</div>
				</div>
			</div>
			<div
				className={`${styles.buttonContainer} ${
					showReadingButton ? styles.show : ''
				}`}
			>
				<button onClick={handleReadingStart} className={styles.readingButton}>
					Начать чтение расклада
				</button>
			</div>
		</main>
	)
}
