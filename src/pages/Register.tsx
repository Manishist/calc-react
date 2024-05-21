import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        navigate('/login');
    }

    return (
        <div className="login-container">
            <form onSubmit={submit} style={{ maxWidth: '400px', display: "flex", flexDirection: "column" }}>
                <div style={{fontFamily: "sans-serif", fontWeight: "600", fontSize: "24px", textAlign: "center", color: "#012169", marginTop: "15px", marginBottom: "15px"}}>Please Register</div>

                <input style={{height: "44px", border: "1px solid #D0D5DD", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", marginBottom: "15px"}} className="form-control" placeholder="Name" required
                    onChange={e => setName(e.target.value)}
                />

                <input type="email" style={{height: "44px", border: "1px solid #D0D5DD", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", marginBottom: "15px"}} className="form-control" placeholder="Email address" required
                    onChange={e => setEmail(e.target.value)}
                />

                <input type="password" style={{height: "44px", border: "1px solid #D0D5DD", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", marginBottom: "15px"}} className="form-control" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />

                <button style={{padding: "10px 18px", gap: "8px", width: "100%", height: "44px", background: "#17B169", border: "1px solid #17B169", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", color: "white"}}  type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;
