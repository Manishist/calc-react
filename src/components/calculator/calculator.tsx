import React, { useState } from 'react';
import './calculator.css';

interface CalculatorProps {
    projectHistory: string[];
    setProjectHistory: (history: string[]) => void;
    projectName: string;
    email: string;
}

const Calculator: React.FC<CalculatorProps> = ({ projectHistory, setProjectHistory, projectName, email }) => {
    const [display, setDisplay] = useState('');

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
                user_email: email,
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
        <div style={{display: "flex"}}>
            <div className="calculator">
                <div className="display">{display}</div>
                <div className="buttons">
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
            <div className="history">
                <div>History</div>
                {projectHistory.map((hist, index) => (
                    <div key={index}>{hist}</div>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
