import React, { useEffect, useState } from 'react'

function Home() {

    const [apiTest, setApiTest] = useState(null);

    useEffect(() => {
        fetch('/api/test')
            .then(res => {
                console.log(res);
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(res => setApiTest(res.message) )
            .catch(err => console.log(err));
    }, [])

    return (
        <>
        <h1>HOME /</h1>
        <p>Express API test result: <span style={{color: 'green'}}> {apiTest}</span></p>
        </>
    )
}

export default Home