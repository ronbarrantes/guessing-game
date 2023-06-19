import { useEffect } from 'react'

import classNames from 'classnames'

import { useBoardState } from '@/state/boardState'
import { buildCardData } from '@/utils/card'

// interface DialogState {
//   isOpen: boolean
//   setIsOpen: () => void
//   dialogContent: React.ReactNode
//   dialogTitle: string
//   handleDialog: ({
//     content,
//     title,
//   }: {
//     title: string
//     content: React.ReactNode
//   }) => void
//   handleDialogClose: () => void
// }

// export const useDialogStore = create<DialogState>((set) => ({
//   isOpen: false,
//   setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
//   dialogTitle: '',
//   dialogContent: null,
//   handleDialog: ({ title, content }) =>
//     set({ dialogTitle: title, dialogContent: content, isOpen: true }),
//   handleDialogClose: () => set({ dialogContent: null, isOpen: false }),
// }))

// export const DialogV2 = () => {
//   const dialogStore = useDialogStore()
//   const { isOpen, dialogContent, dialogTitle, handleDialogClose } = dialogStore

// What state do I need for my board and cards???

// shuffled cards
// selected card
// matched cards
// guesses
// level
// game over

export interface CardData {
  cardId: number
  matched: boolean
  selected: boolean
  // handleClick: (cardId: number) => void
  cardImage: string
  cardText: string
  cardColor: string
}

interface CardProps extends CardData {
  handleMatch: (cardId: number) => void
}

const Card = ({ handleMatch, cardId, matched, selected }: CardProps) => {
  const handleClick = () => {
    handleMatch(cardId)
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
        const id = `${card.cardId}__${idx}`
        return <Card key={id} {...card} handleMatch={handleMatch} />
      })}
    </main>
  )
}

Board.Card = Card
