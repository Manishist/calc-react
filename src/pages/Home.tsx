import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
    name: string;
    email: string;
    setProjectHistory: (history: string[]) => void;
    projectName: string;
    setProjectName: (name: string) => void;
}

const Home: React.FC<HomeProps> = ({ name, email, setProjectHistory, projectName, setProjectName }) => {
    const navigate = useNavigate();
    const [projectModal, setProjectModal] = useState(false);
    const [userProjects, setUserProjects] = useState<string[]>([]);

    useEffect(() => {
        // Fetch user projects when the component mounts
        fetch('http://localhost:8000/api/user-projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_email: email }) // Send user email as payload
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Set the fetched user projects to state
                setUserProjects(data.projects);
            })
            .catch(error => {
                console.error('Error fetching user projects:', error.message);
                // Handle error scenario
            });    }, []); 

    const openModal = () => {
        setProjectModal(true);
    };

    const closeModal = () => {
        setProjectModal(false);
        setProjectName("");
    };

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    };

    const goToProject = (projectName: string) => {
        fetch('http://localhost:8000/api/project-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_email: email, project_name: projectName })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setProjectHistory(data.history);
            setProjectName(projectName);
            navigate('/calculator');
        })
        .catch(error => {
            console.error('Error fetching user projects:', error.message);
            // Handle error scenario
        })
    }

    const createProject = () => {
        const userEmail = email;
        const projectNamex = projectName; 

        if (projectName.trim() !== "") {
            navigate('/calculator');
            const payload = {
                user_email: userEmail,
                project_name: projectNamex
            };

            fetch('http://localhost:8000/api/project', {
            method: 'POST',
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
            console.log('Project created successfully:', data);
            navigate('/calculator');
        })
        .catch(error => {
            console.error('There was a problem creating the project:', error.message);
            // Handle error scenario, such as showing an alert to the user
            alert('There was a problem creating the project. Please try again.');
        });
        } else {
            alert("Please enter a project name.");
        }
    };

    return (
        <div>
            {name ? 'Hi ' + name : 'You are not logged in'}
            <button onClick={openModal}>
                Create New Project
            </button>
            {projectModal && 
                <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px", zIndex: "1000"}}>
                    <div>Project Name</div>
                    <input 
                        placeholder='Add Project Name' 
                        value={projectName} 
                        onChange={nameHandler}
                        style={{ marginBottom: '10px' }}
                    />
                    <div>
                        <button onClick={closeModal} style={{backgroundColor: "red", color: "white"}}>Cancel</button>
                        <button onClick={createProject} style={{ marginLeft: '10px', backgroundColor: "blue", color: "white"}}>Create</button>
                    </div>
                </div>
            }
            <div>
                <h2>User Projects</h2>
                <div  style={{marginRight: "20px"}}>
                    {userProjects.map((project, index) => (
                        <button onClick={() => goToProject(project)} style={{marginTop: "10px", display: "flex", flexDirection: "column"}} key={index}>{project}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
