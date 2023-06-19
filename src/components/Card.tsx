import classNames from 'classnames'

interface CardData {
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
export const Card = ({
  handleMatch,
  matched,
  selected,
  cardImage,
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
          'flip-card',
          // 'flip-action',
          'm-5 !border-5 !border-blue-500 border-transparent w-fit h-fit flex justify-center items-center',
          { 'bg-green-500 border-green-500': matched },
          { 'bg-red-500 border-red-500': selected },
          { 'bg-gray-500 border-gray-500': !matched && !selected },
        )}
      >
        <div
          className={classNames('flip-card-inner', {
            'flip-action': matched || selected,
          })}
        >
          <button
            onClick={handleMatch}
            disabled={matched || selected || disabled}
            className={classNames(
              'flip-card-front block',
              'w-40 p-2 h-40 border border-red-500',
              { 'cursor-pointer': !matched && !selected },
            )}
            aria-label={`Card to flip`}
          />
          <div className="flip-card-back">
            <img src={cardImage} className="w-full h-full object-fill" />
          </div>
        </div>
      </div>
    </div>
  )
}
