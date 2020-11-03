import React from 'react';
import './signInField.scss';

export default function signInField(props) {
    const { name, label, type, icon, placeholder, field, form } = props
    return(
        <div className="signInField">
            <div className="signInField__label">
                <p>{label}</p>
            </div>
            <div className="signInField__input">
                {icon}
                <input name={name} type={type} placeholder={placeholder}/>
            </div>
        </div>
    )
}