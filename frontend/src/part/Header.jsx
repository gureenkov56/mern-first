import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.scss'

function Header() {

    return (
        <header>
            <h1>HEADER</h1>
            <Link to="/login" >Login</Link>
        </header>
    )
}

export default Header