import React from 'react'
import Header from './part/Header.jsx'
import { Outlet } from 'react-router-dom'
import './styles/basiclayout.scss'

function BasicLayout() {

    return (
        <>
            <Header />
            <section className='container'>
                <Outlet />
            </section>
        </>
    )
}

export default BasicLayout