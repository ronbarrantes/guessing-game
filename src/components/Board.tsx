import { useEffect, useState } from 'react'

import { Card } from '@/components/Card'
import { useBoardState } from '@/state/boardState'
import { buildCardData } from '@/utils/card'
import { getEmoji } from '@/utils/emoji'
import { LoadingPage } from './Loaders'

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
    return <LoadingPage />
  }

  const cardEmoji = getEmoji()

  return (
    <main className="m-auto flex h-full grow flex-wrap overflow-hidden border border-red-500 2xl:w-10/12">
      {isGameOver && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex flex-col gap-3 rounded-lg bg-white p-4 text-black shadow-lg  shadow-black">
            <h2 className="text-center text-6xl">Game Over</h2>
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
            cardEmoji={cardEmoji}
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
