import * as ReactSelect from '@radix-ui/react-select';

import './index.scss';

export function Select({ defaultValue, value, disabled, onChange, onSelect, children, dropIcon="/assets/images/icons/angulo.svg", className, placeholder }) {

  function handleChange(value) {
    if (!onSelect) {
      onChange(value);
      return;
    }

    let changeValue = true;

    for (const definition of onSelect) {
      if (value == definition.value) {
        definition.callback();
        changeValue = false;
      }
    }

    if (changeValue)
      onChange(value);
  }


  return (
    <div className={'custom-select ' + (disabled ? "disabled " : "") + (className ?? "")}>
      <ReactSelect.Root disabled={disabled} defaultValue={defaultValue} value={value} onValueChange={handleChange}>
        <ReactSelect.Trigger className="select-trigger" aria-label="Select">
          <ReactSelect.Value placeholder={placeholder || "Select..."} />
          <ReactSelect.Icon className='drop-icon'>
            <img src={dropIcon} alt="" />
          </ReactSelect.Icon>
        </ReactSelect.Trigger>

        <ReactSelect.Content className="select-content">
          <ReactSelect.Viewport className="select-viewport">
            {children}
          </ReactSelect.Viewport>
        </ReactSelect.Content>
      </ReactSelect.Root>
    </div>
  );
}

export function SelectItem({ disabled, onClick, value, children, className }) {
  return (
    <ReactSelect.Item disabled={disabled} onClick={onClick} value={value} className={"select-item " + (className ? className : "")}>
      <ReactSelect.ItemText>{children}</ReactSelect.ItemText>
    </ReactSelect.Item>
  );
}