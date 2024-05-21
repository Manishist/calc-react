import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../utils';

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

        if (response.ok) {
            // Store the email in a cookie
            console.log("xxx content", content)
            setCookie(`${content.name}` + "email", content.email, 1)
            setCookie(`${content.name}` + "admin", content.is_admin, 1)
            // Set name in parent component
            setName(content.name);

            // Redirect to home page after successful login
            navigate('/home');
        } else {
            // Handle login failure
            console.error('Login failed:', content);
            alert('Login failed, please try again.');
        }
    }

    return (
        <div className="login-container">
            <div className="row">
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                    <form onSubmit={submit} className="w-100" style={{ maxWidth: '400px', display: "flex", flexDirection: "column" }}>
                        <div style={{fontFamily: "sans-serif", fontWeight: "600", fontSize: "24px", textAlign: "center", color: "#012169", marginTop: "15px", marginBottom: "15px"}}>Please Login</div>
                        <input style={{height: "44px", border: "1px solid #D0D5DD", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", marginBottom: "15px"}} type="email" className="form-control mb-2" placeholder="Email address" required
                               onChange={e => setEmail(e.target.value)}
                        />
                        <input style={{height: "44px", border: "1px solid #D0D5DD", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", marginBottom: "15px"}} type="password" className="form-control mb-2" placeholder="Password" required
                               onChange={e => setPassword(e.target.value)}
                        />
                        <button style={{padding: "10px 18px", gap: "8px", width: "100%", height: "44px", background: "#1570EF", border: "1px solid #1570EF", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", color: "white"}} type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
