import { capitalize } from '@/utils/text'

interface SelectProps {
  name: string
  selectChoices: string[]
  label?: string
  setSelection: (selection: string) => void
}

export const Select = ({
  selectChoices,
  setSelection,
  label,
  name,
}: SelectProps) => {
  return (
    <div className="text-black">
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} onChange={(e) => setSelection(e.target.value)}>
        {selectChoices.map((choice, idx) => (
          <option key={`${choice}-${idx}`} value={choice}>
            {capitalize(choice)}
          </option>
        ))}
      </select>
    </div>
  )
}
