import classNames from 'classnames'

import { useBoardState } from '@/state/boardState'

export interface CardData {
  id: string
  cardNumber: number
  matched: boolean
  selected: boolean
  cardImage: string
  cardColor: string
}

interface CardProps extends CardData {
  disabled: boolean
  cardEmoji: string
  handleMatch: () => void
}

const difficultyStyles: Record<string, string> = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  IMPOSSIBLE: 'impossible',
}

// CARD
export const Card = ({
  matched,
  selected,
  cardImage,
  cardEmoji,
  disabled,
  // cardColor,
  handleMatch,
}: CardProps) => {
  const { difficulty } = useBoardState()

  return (
    <div
      // this is in control of the space taken by the card
      className={classNames(
        'flex items-center justify-center text-6xl',
        difficultyStyles[difficulty],
      )}
      aria-disabled={matched || selected}
    >
      <div
        // this is the card itself
        className={classNames('flip-card m-5 h-48 w-48 bg-transparent')}
      >
        <div
          className={classNames(
            'flip-card-inner relative h-full w-full rounded-3xl border-2 border-transparent text-center hover:border-yellow-500',
            {
              'flip-action': matched || selected,
              'border-green-500 bg-green-500': matched,
              'border-yellow-500 bg-yellow-500': selected,
            },
          )}
        >
          <button
            onClick={handleMatch}
            disabled={matched || selected || disabled}
            className={classNames(
              'flip-card-front absolute block h-full w-full rounded-3xl bg-blue-300 ',
              {
                'cursor-pointer': !matched && !selected,
              },
            )}
            aria-label={`Card to flip`}
          >
            {cardEmoji}
          </button>
          <div className="absolute w-full h-full bg-green-300 flip-card-back rounded-3xl">
            <img
              src={cardImage}
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
