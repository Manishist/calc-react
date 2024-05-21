import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Calculator from './components/calculator/calculator';
import { getCookie } from './utils';
import Dashboard from './components/dashboard/Dashboard';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [projectHistory, setProjectHistory] = useState<string[]>([]);
    const [projectName, setProjectName] = useState("");
    const [showEmail, setShowEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState('')

    useEffect(() => {
        setShowEmail(getCookie(`${name}email`));
        setProjectName(getCookie(`${name}project`));
        setIsAdmin(getCookie(`${name}admin`))
    }, [name]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const content = await response.json();
                setName(content.name);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="App" style={{backgroundColor: "#52a7c1", backgroundImage: "linear-gradient(315deg, #52a7c1 0%, #b3f6d8 74%)", height: "100vh"}}>
            <BrowserRouter>
                <Nav name={name} setName={setName} isAdmin={isAdmin}/>
                <main className="form-signin">
                    <Routes>
                        <Route path="/" element={<Login setName={setName} email={email} setEmail={setEmail}/>} />
                        <Route path="/login" element={<Login setName={setName} email={email} setEmail={setEmail}/>} />
                        <Route path="/home" element={<Home name={name} email={email} setProjectHistory={setProjectHistory} projectName={projectName} setProjectName={setProjectName} showEmail={showEmail} isAdmin={isAdmin}/>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/calculator" element={<Calculator projectHistory={projectHistory} setProjectHistory={setProjectHistory} projectName={projectName} showEmail={showEmail} isAdmin={isAdmin}/>} />
                        <Route path="/dashboard" element={<Dashboard isAdmin={isAdmin} name={name} showEmail={showEmail}/>} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
