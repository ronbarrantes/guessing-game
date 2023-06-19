import classNames from 'classnames'

interface CardData {
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
      className={classNames('w-1/4 h-1/2 flex justify-center items-center')}
      aria-disabled={matched || selected}
    >
      <div className={classNames('flip-card m-5 w-48 h-48 bg-transparent')}>
        <div
          className={classNames(
            'flip-card-inner w-full h-full relative border-2 border-transparent text-center rounded-3xl hover:border-yellow-500',
            {
              'flip-action': matched || selected,
              'bg-green-500 border-green-500': matched,
              'bg-yellow-500 border-yellow-500': selected,
            },
          )}
        >
          <button
            onClick={handleMatch}
            disabled={matched || selected || disabled}
            className={classNames(
              'flip-card-front block rounded-3xl text-6xl bg-blue-300 absolute w-full h-full',
              {
                'cursor-pointer': !matched && !selected,
              },
            )}
            aria-label={`Card to flip`}
          >
            {cardEmoji}
          </button>
          <div className="flip-card-back rounded-3xl bg-green-300 absolute w-full h-full">
            <img
              src={cardImage}
              className="w-full h-full rounded-3xl object-fill"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
