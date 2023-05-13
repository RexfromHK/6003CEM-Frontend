import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const UserFavorite = props => {

    const [cats, setCats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = sessionStorage.getItem('userId');
    const [result, setResult] = useState('');
    const location = window.location;
    const navigate = useNavigate();
    const favoriteid = '';

    console.log(userId);


    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.1.251:3001/api/favorite/getallcat/${userId}`)
            .then(res => {
                setCats(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    }, [userId]); // add location to the dependency array


    async function deleteCat(favoriteid) {
        console.log(favoriteid)
        try {
            const response = await fetch(`http://192.168.1.251:3001/api/favorite/delete/${favoriteid}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete cat with id ${favoriteid}`);
            }

            const data = await response.json();
            console.log(`Deleted cat with id ${favoriteid}`);
            location.reload(); // 在這裡重新加載頁面
            return data;
        } catch (error) {
            console.error(error);
        }
    }




    return (

        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/user/home">Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/user/favorite">Favorite</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user/message">Message</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user/login">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <br />
            <h3>Cat List</h3>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {cats && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Location</th>
                            <th>Cat Name</th>
                            <th>Age</th>
                            <th>Breed</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cats.map(cat => (
                            <tr key={cat.id}>
                                <td style={{ verticalAlign: 'middle' }}>{cat.id}</td>
                                <td style={{ verticalAlign: 'middle' }}><img src={`http://192.168.1.251:3001/uploads/${cat.image}`} alt={cat.name} width="50" /></td>
                                <td style={{ verticalAlign: 'middle' }}>{cat.location}</td>
                                <td style={{ verticalAlign: 'middle' }}>{cat.name}</td>
                                <td style={{ verticalAlign: 'middle' }}>{cat.age}</td>
                                <td style={{ verticalAlign: 'middle' }}>{cat.Breed}</td>
                                <td style={{ verticalAlign: 'middle' }}>{cat.status}</td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <button onClick={() => deleteCat(cat.favorite_id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserFavorite;
