import React from 'react';
import {Link} from "react-router-dom";

interface NavProps {
    name: string;
    setName: (name: string) => void;
    isAdmin: string;
}

const Nav: React.FC<NavProps> = ({ name, setName, isAdmin }) => {
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        setName('');
    }

    let menu;
    console.log("namee", name)
    if (name === '' || name === undefined ) {
        menu = (
            <>
                <div style={{backgroundColor: "#1570EF"}}>
                    <Link to="/login" >Login</Link>
                </div>
                <div style={{backgroundColor: "#17B169"}}>
                    <Link to="/register" >Register</Link>
                </div>
            </>
        )
    } else {
        menu = (
            <>
                <div style={{backgroundColor: "#17B169"}}>
                    <Link to="/home">Home</Link>
                </div>
                {isAdmin == "true" && <div style={{backgroundColor: "#17B169"}}>
                    <Link to="/dashboard">Admin Dashboard</Link>
                </div>}
                <div style={{backgroundColor: "#C60C30"}}>
                    <Link to="/login" onClick={logout}>Logout</Link>
                </div>
            </>
        )
    }

    return (
        <nav className='nav-bar' style={{display: "flex", padding: "20px"}}>
            {menu}
        </nav>
    );
};

export default Nav;