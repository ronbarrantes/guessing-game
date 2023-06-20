const emojis = ['😄', '🧐', '😎', '😂', '😊', '🥳', '😳']

export const getEmoji = () => {
  const currentMinute = new Date().getMinutes()
  const number = currentMinute % emojis.length
  return emojis[number]
}
