import { useEffect } from 'react'

import classNames from 'classnames'

import { useBoardState } from '@/state/boardState'
import { buildCardData } from '@/utils/card'

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
  handleMatch: (cardId: number) => void
}

const Card = ({ handleMatch, cardNumber, matched, selected }: CardProps) => {
  const handleClick = () => {
    handleMatch(cardNumber)
  }
  return (
    <div
      className={classNames(
        'w-1/4 h-1/2 border border-black',
        { 'bg-green-500': matched },
        { 'bg-red-500': selected },
        { 'bg-gray-500': !matched && !selected },
        { 'cursor-pointer': !matched && !selected },
      )}
      onClick={handleClick}
      aria-disabled={matched || selected}
    >
      stuff
    </div>
  )
}

export const Board = () => {
  const dialogStore = useBoardState()
  const { cards, loadCards } = dialogStore

  useEffect(() => {
    buildCardData().then((cardData) => {
      loadCards(cardData)
    })
  }, [loadCards])

  const handleMatch = (cardId: number) => {
    console.log('handleMatch', cardId)
  }

  return (
    <main className="flex grow h-full flex-wrap overflow-hidden">
      {Object.values(cards).map((card, idx) => {
        const id = card.id
        return <Card key={id} {...card} handleMatch={handleMatch} />
      })}
    </main>
  )
}

Board.Card = Card
