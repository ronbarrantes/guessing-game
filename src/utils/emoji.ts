const emojis = ['😄', '🧐', '😎', '😂', '😊', '🥳', '😳']

export const getEmojiByTime = () => {
  const currentMinute = new Date().getMinutes()
  const number = currentMinute % emojis.length
  return emojis[number]
}

export const getEmoji = () => {
  const number = Math.floor(Math.random() * emojis.length)
  return emojis[number]
}
