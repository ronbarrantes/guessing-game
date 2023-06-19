import { create } from 'zustand'

import { CardData } from '@components/Card'

type Cards = Record<string, CardData>

interface BoardState {
  cards: Cards
  guessCount: number
  currentCard: CardData | null
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'IMPOSSIBLE'
  isGameOver: boolean
  boardDisabled: boolean
  loadCards: (cards: Cards) => void
  chooseDifficulty: (difficulty: BoardState['difficulty']) => void
  setGameOver: (isGameOver: boolean) => void
  resetGame: () => void
  checkCard: (card: CardData) => void
  clearSelectedCards: () => void
  increaseGuessCount: () => void
}

export const useBoardState = create<BoardState>((set) => ({
  cards: {},
  difficulty: 'EASY',
  isGameOver: false,
  currentCard: null,
  boardDisabled: false,
  guessCount: 0,
  increaseGuessCount: () =>
    set((state) => ({ guessCount: state.guessCount + 0.5 })),
  resetGame: () => set({ cards: {}, isGameOver: false, guessCount: 0 }),
  loadCards: (cards: Cards) => set({ cards, isGameOver: false, guessCount: 0 }),
  chooseDifficulty: (difficulty: BoardState['difficulty']) =>
    set({ difficulty }),
  setGameOver: (isGameOver: boolean) => set({ isGameOver }),
  clearSelectedCards: () =>
    set((state) => {
      const cards = Object.values(state.cards).reduce(
        (cardList, card) => ({
          ...cardList,
          [card.id]: { ...card, selected: false },
        }),
        {},
      )
      return { ...state, cards, boardDisabled: false }
    }),
  checkCard: (card: CardData) =>
    set((state) => {
      const selectedCards = {
        ...state.cards,
        [card.id]: { ...card, selected: true },
      }

      if (!state.currentCard)
        return { ...state, cards: selectedCards, currentCard: card }

      if (state.currentCard.cardNumber === card.cardNumber) {
        const matchedCards = {
          ...state.cards,
          [card.id]: { ...card, matched: true },
          [state.currentCard.id]: { ...state.currentCard, matched: true },
        }
        return { ...state, cards: matchedCards, currentCard: null }
      }

      return {
        ...state,
        cards: selectedCards,
        currentCard: null,
        boardDisabled: true,
      }
    }),
}))
