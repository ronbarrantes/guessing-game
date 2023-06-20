import { useBoardState } from '@/state/boardState'

export const Selection = () => {
  const { difficulty } = useBoardState()

  return (
    <div className="selection">
      <h1>Selection</h1>
    </div>
  )
}
