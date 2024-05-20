import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Calculator from './components/calculator/calculator';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [projectHistory, setProjectHistory] = useState<string[]>([]);
    const [projectName, setProjectName] = useState("");

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.name);
            }
        )();
    }, []); 

    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName} />

                <main className="form-signin">
                    <Routes>
                        <Route path="/" element={<Home name={name} email={email} setProjectHistory={setProjectHistory} projectName={projectName} setProjectName={setProjectName}/>} />
                        <Route path="/login" element={<Login setName={setName} email={email} setEmail={setEmail}/>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/calculator" element={<Calculator projectHistory={projectHistory} setProjectHistory={setProjectHistory} projectName={projectName} email={email}/>} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
