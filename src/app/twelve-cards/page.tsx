'use client'

import { useTelegram } from '@/hooks/useTelegram'
import Image from 'next/image'
import { useState } from 'react'
import { CARDS } from '../constants'
import styles from '../page.module.css'

export default function TwelveCards() {
	const [isStarted, setIsStarted] = useState(false)
	const [firstSetCards, setFirstSetCards] = useState<string[]>([])
	const [secondSetCards, setSecondSetCards] = useState<string[]>([])
	const [selectedFirstSet, setSelectedFirstSet] = useState<string[]>([])
	const [selectedSecondSet, setSelectedSecondSet] = useState<string[]>([])
	const [showSecondSet, setShowSecondSet] = useState(false)
	const [showReadingButton, setShowReadingButton] = useState(false)
	const { isReady, close } = useTelegram()

	const startReading = () => {
		if (!isStarted) {
			setIsStarted(true)
			const allSelectedCards = getRandomCards(18)
			setFirstSetCards(allSelectedCards.slice(0, 9))
			setSecondSetCards(allSelectedCards.slice(9, 18))
		}
	}

	const getRandomCards = (count: number) => {
		const shuffled = [...CARDS].sort(() => Math.random() - 0.5)
		return shuffled.slice(0, count)
	}

	const handleCardClick = (card: string) => {
		if (!showSecondSet) {
			if (selectedFirstSet.length < 6 && !selectedFirstSet.includes(card)) {
				const newSelectedCards = [...selectedFirstSet, card]
				setSelectedFirstSet(newSelectedCards)
				if (newSelectedCards.length === 6) {
					setTimeout(() => {
						setShowSecondSet(true)
					}, 1000)
				}
			}
		} else {
			if (selectedSecondSet.length < 6 && !selectedSecondSet.includes(card)) {
				const newSelectedCards = [...selectedSecondSet, card]
				setSelectedSecondSet(newSelectedCards)
				if (newSelectedCards.length === 6) {
					setShowReadingButton(true)
				}
			}
		}
	}

	const handleReadingStart = () => {
		if (
			isReady &&
			selectedFirstSet.length === 6 &&
			selectedSecondSet.length === 6
		) {
			const allSelectedCards = [...selectedFirstSet, ...selectedSecondSet]
			window.Telegram.WebApp.sendData(JSON.stringify(allSelectedCards))
			close()
		}
	}

	return (
		<main className={`${styles.main} ${styles.twelve}`}>
			<div
				className={`${styles.background} ${
					showReadingButton ? styles.showButton : ''
				}`}
			>
				{isStarted && (
					<>
						<h1 className={styles.title}>
							{!showSecondSet ? 'Выберите 6 карт' : 'Выберите ещё 6 карт'}
						</h1>
						<div className={styles.cardsContainer}>
							{(!showSecondSet ? firstSetCards : secondSetCards).map(
								(card, index) => (
									<div
										key={card}
										className={`${styles.card} ${
											!showSecondSet
												? styles['cardAppear' + index]
												: styles.visible
										}`}
										onClick={() => handleCardClick(card)}
									>
										<div
											className={`${styles.cardInner} ${
												(!showSecondSet
													? selectedFirstSet
													: selectedSecondSet
												).includes(card)
													? styles.flipped
													: ''
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
								)
							)}
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
				<button className={styles.readingButton} onClick={handleReadingStart}>
					Начать чтение расклада
				</button>
			</div>
		</main>
	)
}
