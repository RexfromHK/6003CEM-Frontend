import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const StaffMessage = props => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = sessionStorage.getItem('userId');
    const [recipientId, setRecipientId] = useState("");
    const location = window.location;
    const navigate = useNavigate();

    async function DeleteMessage(messageid) {
        try {
            const response = await fetch(`http://192.168.1.251:3001/api/message/delete/${messageid}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete cat with id ${messageid}`);
            }

            const data = await response.json();
            console.log(`Deleted cat with id ${messageid}`);
            location.reload(); // 在這裡重新加載頁面
            return data;
        } catch (error) {
            console.error(error);
        }
    }


    console.log(userId);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.1.251:3001/api/message/get/${userId}`)
            .then(response => {
                setMessages(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    const handleSubmit = event => {
        event.preventDefault();
        axios.post('http://192.168.1.251:3001/api/message/add', {
            senderId: '0',
            receiverId: '1',
            message: newMessage
        })
            .then(response => {
                setNewMessage('');
                setMessages([...messages, response.data]);
                location.reload(); // 在這裡重新加載頁面
            })

            .catch(error => {
                setError(error.message);
            });
    };

    const handleNewMessageChange = event => {
        setNewMessage(event.target.value);
    };

    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/staff/home">Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/staff/addcat">Post</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/staff/message">Message</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/staff/login">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>




            <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
                <h3 style={{ textAlign: 'center' }}>Messages</h3>
                <table style={{ borderCollapse: 'collapse' }}>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '5px' }}>User Query</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}><a href="#">U01</a></td>
                        <td style={{ border: '1px solid black', padding: '5px' }}><a href="#">U05</a></td>
                    </tr>
                </table>
                {loading && <p>Loading messages...</p>}
                {error && <p>An error occurred: {error}</p>}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, backgroundColor: '#f2f2f2', padding: '20px', height: '500px', overflowY: 'scroll' }}>
                    {messages.map((message) => (
                        <li key={message.id}
                            style={{
                                maxWidth: '100%',
                                textAlign: message.sender_id == '0' ? 'right' : 'left',
                            }}
                        >
                            <div>
                                {message.sender_id == '0' ? '(You)' : '(Username: U01)' }
                                {'-'}
                                {new Date(message.created_at).toLocaleString()}
                            </div>
                            <li
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    backgroundColor: message.sender_id == '0' ? 'white' : '#ffe4e1',
                                    padding: '10px',
                                    margin: '10px 0',
                                    borderRadius: '5px',
                                    maxWidth: '100%',
                                    textAlign: message.sender_id == '0' ? 'right' : 'left',
                                }}
                            >
                                {message.message}&nbsp;&nbsp;

                              
                                    <button onClick={() => DeleteMessage(message.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                
                            </li>

                        </li>

                    ))}
                </ul>

                <br />
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex' }}>
                        <input
                            type="text"
                            id="new-message"
                            value={newMessage}
                            onChange={handleNewMessageChange}
                            style={{ flex: '5', padding: '5px', borderRadius: '5px', }}
                        />
                        <button type="submit" style={{ flex: '1', borderRadius: '5px' }}>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default StaffMessage;
