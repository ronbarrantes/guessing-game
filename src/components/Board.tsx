import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { useBoardState } from '@/state/boardState'
import { buildCardData } from '@/utils/card'
import { LoadingPage } from './Loaders'

export interface CardData {
  id: string
  cardNumber: number
  matched: boolean
  selected: boolean
  cardImage: string
  cardText: string
  cardColor: string
}

interface CardProps extends CardData {
  disabled: boolean
  handleMatch: () => void
}

// CARD
const Card = ({
  handleMatch,
  matched,
  selected,
  cardImage,
  cardNumber,
  disabled,
}: CardProps) => {
  return (
    <div
      className={classNames(
        'w-1/4 h-1/2 border border-red-400 flex justify-center items-center',
      )}
      aria-disabled={matched || selected}
    >
      <div
        className={classNames(
          'm-5 !border-5 !border-blue-500 border-transparent w-fit h-fit flex justify-center items-center rounded-full ',
          { 'bg-green-500 border-green-500': matched },
          { 'bg-red-500 border-red-500': selected },
          { 'bg-gray-500 border-gray-500': !matched && !selected },
        )}
      >
        <button
          style={{
            backgroundImage: `url(${cardImage})`,
          }}
          onClick={handleMatch}
          disabled={matched || selected || disabled}
          className={classNames('w-40 p-2 h-40', {
            'cursor-pointer': !matched && !selected,
          })}
          aria-label={`Card to flip`}
        />
      </div>
    </div>
  )
}

// BOARD
export const Board = () => {
  const dialogStore = useBoardState()
  const [loading, setLoading] = useState(true)
  const {
    cards,
    loadCards,
    checkCard,
    boardDisabled,
    increaseGuessCount,
    setGameOver,
    isGameOver,
    clearSelectedCards,
    resetGame,
  } = dialogStore

  useEffect(() => {
    if (!loading) return
    buildCardData().then((cardData) => {
      loadCards(cardData)
      setLoading(false)
    })
  }, [loadCards, setLoading, loading])

  useEffect(() => {
    const hasMatchedCards = Object.values(cards).every((card) => card.matched)
    setGameOver(hasMatchedCards)

    if (boardDisabled) {
      setTimeout(() => {
        clearSelectedCards()
      }, 1000)
    }
  }, [
    boardDisabled,
    cards,
    increaseGuessCount,
    clearSelectedCards,
    setGameOver,
  ])

  if (loading) {
    console.log('CARDS', cards)
    return <LoadingPage />
  }

  return (
    <main className="flex grow h-full flex-wrap overflow-hidden">
      {isGameOver && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg text-black">
            <h2>Game Over</h2>
            <button
              onClick={() => {
                resetGame()
                loadCards(cards)
                setLoading(true)
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {Object.values(cards).map((card) => {
        const id = card.id
        return (
          <Card
            key={id}
            disabled={boardDisabled}
            {...card}
            handleMatch={() => {
              checkCard(cards[id])
              increaseGuessCount()
            }}
          />
        )
      })}
    </main>
  )
}
