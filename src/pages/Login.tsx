import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ email, setEmail, setName }: { email: string, setEmail: (email: string) => void, setName: (name: string) => void }) => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();

        // Redirect to home page after successful login
        navigate('/');
        
        // Set name in parent component
        setName(content.name);
    }

    return (
        <div className="login-container">
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                    <form onSubmit={submit} className="w-100" style={{ maxWidth: '400px' }}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <input type="email" className="form-control mb-2" placeholder="Email address" required
                               onChange={e => setEmail(e.target.value)}
                        />
                        <input type="password" className="form-control mb-2" placeholder="Password" required
                               onChange={e => setPassword(e.target.value)}
                        />
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
