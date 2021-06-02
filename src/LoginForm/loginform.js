import React from 'react'
import './loginform.scss'

const LoginForm = ({changed, label, ...props}) => (
    <div className="group">
        <input className='loginform' onChange={changed} {...props}></input>
        {
            label ?
            (<label className={`${props.value.length ? 'shrink' : ''} form-label`}>
                {label}
            </label>)
            : null
        }
    </div>
)

export default LoginForm;