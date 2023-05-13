import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const StaffLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const userid = '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username, password };
        try {
            const response = await axios.post('http://192.168.1.251:3001/api/account/staff/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            setResult(`Status Codes ${response.status} : ${response.data}`);
            sessionStorage.setItem('userId', response.data.toString());
            window.location.href = 'http://192.168.1.250:3001/staff/home';


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

            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    Username
                    <br />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div style={{ marginTop: 10 }}>
                    Password
                    <br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <GoogleLogin
                    clientId="<'685081965739-olqtda9u85dhvnk37gn8v5ia2i8ma7g1.apps.googleusercontent.com'>"
                    buttonText="Login with Google"

                />
                <br /> <br />
                <button type="submit">Login</button>
                <br />
                <br />
                <div style={{ fontWeight: 'bold' }}>
                    {result && <div> {result}</div>}
                </div>
            </form>
        </div>
    );
};

export default StaffLogin;
