import React from 'react'
import './button.scss'

const Button = ({children, ...props}) => (
    <button className='login-button' {...props}> {children} </button>
)

export default Button