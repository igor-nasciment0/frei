import * as ReactSelect from '@radix-ui/react-select';

import './index.scss';
import React from 'react';

export function Select({ defaultValue, value, disabled, onChange, children, dropIcon = "/assets/images/icons/angulo.svg", className, placeholder }) {

  return (
    <select disabled={disabled} defaultValue={defaultValue} value={value} onChange={e => onChange(e.target.value)} className={"fallback " + (className || "")} >
      <option value="" disabled selected hidden>{placeholder}</option>
        {children}
    </select>
  );

/*   return (
    <div className={'custom-select ' + (disabled ? "disabled " : "") + (className ?? "")}>
      <ReactSelect.Root disabled={disabled} defaultValue={defaultValue} value={value} onValueChange={onChange}>
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
  ); */
}

export function SelectItem({ disabled, onClick, value, children, className }) {

  return (
    <option disabled={disabled} className={className} value={value}>
      {children}
    </option>
  )

/*   return (
    <ReactSelect.Item disabled={disabled} onClick={onClick} value={value} className={"select-item " + (className ? className : "")}>
      <ReactSelect.ItemText>{children}</ReactSelect.ItemText>
    </ReactSelect.Item>
  ); */
}