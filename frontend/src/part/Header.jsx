import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.scss'

function Header() {

    return (
        <header>
            <Link to="/">
                <h1>HEADER</h1>
            </Link>
            <Link to="/login" >Login</Link>
        </header>
    )
}

export default Header