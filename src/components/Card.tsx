import classNames from 'classnames'

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

// CARD
export const Card = ({
  matched,
  selected,
  cardImage,
  cardEmoji,
  disabled,
  handleMatch,
}: CardProps) => {
  return (
    <div
      className={classNames('flex h-1/2 w-1/4 items-center justify-center')}
      aria-disabled={matched || selected}
    >
      <div className={classNames('flip-card m-5 h-48 w-48 bg-transparent')}>
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
              'flip-card-front absolute block h-full w-full rounded-3xl bg-blue-300 text-6xl',
              {
                'cursor-pointer': !matched && !selected,
              },
            )}
            aria-label={`Card to flip`}
          >
            {cardEmoji}
          </button>
          <div className="flip-card-back absolute h-full w-full rounded-3xl bg-green-300">
            <img
              src={cardImage}
              className="h-full w-full rounded-3xl object-fill"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
