interface SelectProps {
  name: string
  selectChoices: string[]
  setSelection: (selection: string) => void
  label?: string
}

export const Select = ({
  selectChoices,
  setSelection,
  label,
  name,
}: SelectProps) => {
  return (
    <div className="selection text-black">
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} onChange={(e) => setSelection(e.target.value)}>
        {selectChoices.map((choice, idx) => (
          <option key={`${choice}-${idx}`} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  )
}
