const getCardImage = async (width = 200, height?: number) => {
  !height ? (height = width) : height
  const image = await fetch(`https://picsum.photos/${width}/${height}`)
  const result = image.url
  return result
}

const getImageList = async (count: number, size: number) => {
  const images = await Promise.all(
    Array.from({ length: count }, () => getCardImage(size)),
  )
  return images
}

const makeColorRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return `#${randomColor}`
}

const randomizeCardData = <T>(cardData: T[]) =>
  cardData.sort(() => Math.random() - 0.5)

export const buildCardData = async (count: number, size: number) => {
  const images = await getImageList(count, size)
  const cardData = images.map((image, idx) => ({
    cardNumber: idx,
    matched: false,
    selected: false,
    cardImage: image,
    cardText: `Card ${idx}`,
    cardColor: makeColorRandomColor(),
  }))

  const data = randomizeCardData(
    [...cardData, ...cardData].map((card, idx) => ({
      ...card,
      id: `${card.cardNumber}_${idx}`,
    })),
  )

  return data.reduce((cards, card) => ({ ...cards, [card.id]: card }), {})
}
