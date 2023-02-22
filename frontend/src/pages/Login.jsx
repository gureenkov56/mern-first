import React from 'react'
import '../styles/Login.scss'

function Login() {

    return (
        <>
    <h1>LOGIN PAGE</h1>
    <form>
        <div>
            <label htmlFor="login">Login</label>
            <input type="text" name='login' />
        </div>
        <div>
            <label htmlFor="password">Password</label>
        <input type="password" name='password' />
        </div>
        <button>Log in</button>
        <button>Registration</button>
    </form>
        </>
    )
}

export default Login