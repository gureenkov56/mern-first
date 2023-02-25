import React, { useState } from 'react'
import '../styles/Login.scss'

function Login() {
    const [form, setForm] = useState({
        login: '',
        password: '',
    })

    const [errorsList, setErrorsList] = useState([]);

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

    async function fetchCreateUser() {
        try {
            const res = await fetch('/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...form })
            })

            const resJson = await res.json();

            if (!res.ok) {
                const errorMsgs = resJson.errors.map(e => e.msg);
                setErrorsList(errorMsgs);
            } else {
                setErrorsList([]);
                console.log('OK');
            };
        } catch (error) {
            console.log('error', error);
        }
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
                <div className="validation-msg">
                    {
                        errorsList.map((error, idx) => <div className='error' key={idx}>{error}</div>)
                    }
                </div>
            </form>
        </>
    )
}

export default Login