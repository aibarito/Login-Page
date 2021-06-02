import React from 'react'
import {Link} from 'react-router-dom'
import './header.scss'
import logo from '../home.png'
import {auth} from '../firebase'

const Header = ({userState}) => (
    <div className='header'>
        <Link className = "clicklogo" to="/">
            <img  src={logo} alt='logo' className='logo'></img>
        </Link>
        <div className='options'> 
            {
                userState ?
                <div className='option' onClick={() => {auth.signOut()}}>
                    Sign Out
                </div>
                : 
                <Link className='option' to='/login'>Sign in</Link>
            }
        </div>
    </div>
)

export default Header