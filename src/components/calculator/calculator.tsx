import React, { useEffect, useState } from 'react';
import './calculator.css';

interface CalculatorProps {
    projectHistory: string[];
    setProjectHistory: (history: string[]) => void;
    projectName: string;
    showEmail: string;
    showProjectName: string;
    isAdmin: string
}

const Calculator: React.FC<CalculatorProps> = ({ projectHistory, setProjectHistory, projectName, showEmail, isAdmin }) => {
    const [display, setDisplay] = useState('');

    useEffect(() => {
        // Fetch user projects when the component mounts
        fetch('http://localhost:8000/api/project-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_email: showEmail, project_name: projectName }) // Send user email as payload
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Set the fetched user projects to state
                setProjectHistory(data.history)
            })
            .catch(error => {
                console.error('Error fetching user projects:', error.message);
                // Handle error scenario
            });    
        }, [showEmail]); 

    const handleClick = (value: string) => {
        setDisplay(display + value);
    };

    const handleClear = () => {
        setDisplay('');
    };

    const handleEquals = () => {
        try {
            const result = eval(display).toString();
            const newHistoryItem = `${display} = ${result}`;
            
            // Update local project history
            const updatedHistory = [...projectHistory, newHistoryItem];
            setProjectHistory(updatedHistory);
            setDisplay(result);
    
            // Prepare payload for API call
            const payload = {
                user_email: showEmail,
                project_name: projectName,
                history: updatedHistory
            };
    
            // Make PUT API call to update project history
            fetch('http://localhost:8000/api/update-project-history', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Project history updated successfully:', data);
            })
            .catch(error => {
                console.error('There was a problem updating the project history:', error.message);
                // Optionally handle error scenario, e.g., showing an alert to the user
            });
    
        } catch (error) {
            setDisplay('Error');
        }
    };
    
    return (
        <div>
            <div style={{marginTop: "15px", marginBottom: "15px", fontSize: "22px", fontWeight: "500"}}>{showEmail ? '' : 'You are not logged in'}</div>
            <div style={{marginBottom: "20px", fontSize: "28px", fontWeight: "600", width: "300px", textAlign: "center", marginLeft: "-25px"}}>Project - {projectName}</div>
            <div style={{display: "flex", height: "400px", width: "600px", marginLeft: "-115px"}}>
                <div className="calculator" style={{height: "100%", flex: "1", border: "1px solid #ccc", padding: "20px", marginRight: "10px"}}>
                    <div className="display" style={{marginBottom: "20px", fontSize: "24px"}}>{display}</div>
                    <div className="buttons" style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px"}}>
                        <button onClick={() => handleClick('1')}>1</button>
                        <button onClick={() => handleClick('2')}>2</button>
                        <button onClick={() => handleClick('3')}>3</button>
                        <button onClick={() => handleClick('+')}>+</button>
                        <button onClick={() => handleClick('4')}>4</button>
                        <button onClick={() => handleClick('5')}>5</button>
                        <button onClick={() => handleClick('6')}>6</button>
                        <button onClick={() => handleClick('-')}>-</button>
                        <button onClick={() => handleClick('7')}>7</button>
                        <button onClick={() => handleClick('8')}>8</button>
                        <button onClick={() => handleClick('9')}>9</button>
                        <button onClick={() => handleClick('*')}>*</button>
                        <button onClick={() => handleClick('0')}>0</button>
                        <button onClick={handleClear}>C</button>
                        <button onClick={handleEquals}>=</button>
                        <button onClick={() => handleClick('/')}>/</button>
                    </div>
                </div>
                <div className="history" style={{height: "100%", flex: "1", border: "1px solid #ccc", padding: "20px", overflowY: "auto", marginTop: "48px"}}>
                    <div style={{marginBottom: "20px", fontSize: "24px", fontWeight: "600", width: "300px", textAlign: "center", marginLeft: "-25px"}}>History</div>
                    {projectHistory.map((hist, index) => (
                        <div key={index} style={{marginBottom: "10px",  textAlign: "center", fontSize: "20px"}}>{hist}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
