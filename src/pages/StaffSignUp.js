import React, { useState } from 'react';
import axios from 'axios';

const StaffSignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [signupCode, setSignupCode] = useState('');
    const [result, setResult] = useState('');

    // register account via api
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username, password, signupCode };
        try {
            const response = await axios.post('http://192.168.1.251:3001/api/account/staff/add', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResult(`Status Codes ${response.status} : ${response.data}`);
        } catch (error) {
            console.error(error);
            if (error.response) {
                setResult(`Status Codes ${error.response.status} : ${error.response.data}`);
            } else {
                setResult('An error occurred while processing your request.');
            }
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/staff/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/staff/signup">SignUp</a>
                        </li>

                    </ul>
                </div>
            </nav>
            <br />
            <h3>SignUp</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <br />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div style={{ marginTop: 10 }}>
                    <label>Password</label>
                    <br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div style={{ marginTop: 10 }}>
                    <label>Confirme Password</label>
                    <br />
                    <input type="password" onChange={(e) => setcPassword(e.target.value)} />
                </div>

                <div style={{ marginTop: 10 }}>
                    <label>SignUp Code</label>
                    <br />
                    <input type="text" value={signupCode} onChange={(e) => setSignupCode(e.target.value)} />
                </div>
                <br />
                <button type="submit">SignUp</button>
                <br />
                <br />
                <div style={{ fontWeight: 'bold' }}>
                    {result && <div> {result}</div>}
                </div>
            </form>
        </div>
    );
};

export default StaffSignUp;
