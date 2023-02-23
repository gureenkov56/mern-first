import React, { useEffect, useState } from 'react'

function Home() {

    const [apiTest, setApiTest] = useState(null);
    const [getTest, setGetTest] = useState('');

    useEffect(() => {
        fetch('/api/test')
            .then(res => {
                console.log(res);
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(res => setApiTest(res.message))
            .catch(err => console.log(err));
    }, [])

    function testGet() {
        console.log('Click!');
        fetch('/api/test')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setGetTest(res.message);
            })
    }

    return (
        <>
            <h1>HOME /</h1>
            <p>Express API test result: <span style={{ color: 'green' }}> {apiTest}</span></p>
            <hr />
            <button onClick={testGet}>
                Test GET to Console.log
            </button>
            <span style={{ color: 'green' }}> {getTest}</span>
        </>
    )
}

export default Home