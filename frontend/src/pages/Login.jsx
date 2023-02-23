import React, { useState } from 'react'
import '../styles/Login.scss'

function Login() {
    const [form, setForm] = useState({
        login: '',
        password: '',
    })

    function formHandler(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function fetchLogin() {
        console.log('send data', JSON.stringify(form));
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form) 
        })
        .then(res => console.log('res', res))
    }

    function fetchCreateUser() {
        console.log('send data', JSON.stringify(form));
        fetch('/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...form}) 
        })
        .then(res => console.log('res', res))
    }

    return (
        <>
            <h1>LOGIN PAGE</h1>
            <form>
                <div>
                    <label htmlFor="login">Login</label>
                    <input onInput={(e) => formHandler(e)}
                        type="text"
                        name='login'
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onInput={(e) => formHandler(e)}
                        type="password"
                        name='password'
                    />
                </div>
                <button type='button' onClick={fetchLogin}>Log in</button>
                <button type="button" onClick={fetchCreateUser}>Registration</button>
            </form>
        </>
    )
}

export default Login