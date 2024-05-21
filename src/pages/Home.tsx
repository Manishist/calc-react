import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../utils';

interface HomeProps {
    name: string;
    email: string;
    setProjectHistory: (history: string[]) => void;
    projectName: string;
    setProjectName: (name: string) => void;
    showEmail: string;
    isAdmin: string;
}

const Home: React.FC<HomeProps> = ({ name, email, setProjectHistory, projectName, setProjectName, showEmail, isAdmin }) => {
    const navigate = useNavigate();
    const [projectModal, setProjectModal] = useState(false);
    const [userProjects, setUserProjects] = useState<string[]>([]);


    useEffect(() => {
        fetch('http://localhost:8000/api/user-projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_email: showEmail })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserProjects(data.projects);
            })
            .catch(error => {
                console.error('Error fetching user projects:', error.message);
            });    
        }, [showEmail]); 

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
            body: JSON.stringify({ user_email: showEmail, project_name: projectName })
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
            setCookie(`${name}` + "project", projectName, 1)
            navigate('/calculator');
        })
        .catch(error => {
            console.error('Error fetching user projects:', error.message);
        })
    }

    const createProject = () => {
        const userEmail = showEmail;
        const projectNamex = projectName; 
        setCookie(`${name}` + "project", projectNamex, 1)

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
            navigate('/calculator');
        })
        .catch(error => {
            console.error('There was a problem creating the project:', error.message);
            alert('There was a problem creating the project. Please try again.');
        });
        } else {
            alert("Please enter a project name.");
        }
    };

    return (
        <div className='home-container' style={{textAlign: "center"}}>
            <div style={{marginTop: "15px", marginBottom: "15px", fontSize: "22px", fontWeight: "500"}}>{name ? 'Hi, ' + name : 'You are not logged in'}</div>
            <button onClick={openModal} style={{padding: "10px 18px", gap: "8px", height: "44px", background: "#17B169", border: "1px solid #17B169", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", color: "white"}}>
               + Create New Project
            </button>
            {projectModal && 
                <div>
                    <div style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999}}></div>
                    <div style={{position: "fixed", top: "35%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", width: "300px", height: "150px", borderRadius: "8px", zIndex: 1000}}>
                        <div style={{marginBottom: "15px", fontSize: "22px", fontWeight: "500"}}>Project Name</div>
                        <input 
                            placeholder='    Add Project Name' 
                            value={projectName} 
                            onChange={nameHandler}
                            style={{height: "44px", border: "1px solid #D0D5DD", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", marginBottom: "15px", width: "100%"}}
                        />
                        <div style={{display: "flex"}}>
                            <button onClick={closeModal} style={{padding: "10px 18px", gap: "8px", width: "100%", height: "44px", background: "#C60C30", border: "1px solid #C60C30", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", color: "white", marginRight: "10px", marginLeft: "4px"}}>Cancel</button>
                            <button onClick={createProject} style={{padding: "10px 18px", gap: "8px", width: "100%", height: "44px", background: "#17B169", border: "1px solid #17B169", boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", borderRadius: "8px", color: "white"}}>Create</button>
                        </div>
                    </div>
                </div>
            }

            {userProjects && userProjects.length !== 0 && (
                <div>
                    <div style={{ marginTop: "80px", marginBottom: "15px", fontSize: "22px", fontWeight: "500" }}>
                        User Projects
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {userProjects.map((project, index) => (
                            <button 
                                onClick={() => goToProject(project)} 
                                style={{ backgroundColor: "#1570EF", color: "white", padding: "10px 15px", marginBottom: '10px' }} 
                                key={index}
                            >
                                {project}
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;
