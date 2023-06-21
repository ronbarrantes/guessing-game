import { CardData } from '@components'
import { create } from 'zustand'

import { type Difficulty } from '@/constants/difficultyChoices'

type Cards = Record<string, CardData>

interface BoardState {
  boardDisabled: boolean
  cards: Cards
  currentCard: CardData | null
  difficulty: Difficulty
  gamesPlayed: number
  guessCount: number
  isGameOver: boolean
  checkCard: (card: CardData) => void
  clearSelectedCards: () => void
  loadCards: (cards: Cards) => void
  increaseGuessCount: () => void
  resetGame: () => void
  setDifficulty: (difficulty: BoardState['difficulty']) => void
  setGameOver: (isGameOver: boolean) => void
}

export const useBoardState = create<BoardState>((set) => ({
  boardDisabled: false,
  cards: {},
  difficulty: 'EASY',
  currentCard: null,
  gamesPlayed: 0,
  guessCount: 0,
  isGameOver: true,
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
  increaseGuessCount: () =>
    set((state) => ({ guessCount: state.guessCount + 0.5 })),
  loadCards: (cards: Cards) => set({ cards, guessCount: 0 }),
  resetGame: () =>
    set({
      cards: {},
      isGameOver: false,
      guessCount: 0,
      currentCard: null,
    }),
  setDifficulty: (difficulty: BoardState['difficulty']) => set({ difficulty }),
  setGameOver: (isGameOver: boolean) =>
    set((state) => ({ gamesPlayed: state.gamesPlayed + 1, isGameOver })),
}))
