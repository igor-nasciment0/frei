import './index.scss';

export function Select({ defaultValue, value, disabled, onChange, children, className, placeholder }) {
  return (
    <select disabled={disabled} defaultValue={defaultValue} value={value} onChange={e => onChange(e.target.value)} className={"fallback " + (className || "")} >
      <option value="" disabled selected hidden>{placeholder}</option>
      {children}
    </select>
  );
}

export function SelectItem({ disabled, value, children, className }) {
  return (
    <option disabled={disabled} className={className} value={value}>
      {children}
    </option>
  )
}
