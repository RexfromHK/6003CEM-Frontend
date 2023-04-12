import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const UserHome = props => {

    const [cats, setCats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const deletelocation = window.location;

    // If userId is empty, redirect to login page
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();
    if (!userId) {
        navigate('/staff/login');
    }

    console.log(userId);

    const [location, setLocation] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [status, setStatus] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.get(`http://192.168.1.251:3001/api/cat/search`, {
            params: {
                name,
                age,
                breed,
                status,
                location,
            },
        })
            .then((res) => {
                setCats(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    };


    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.1.251:3001/api/cat/getallcat/${userId}`)
            .then(res => {
                setCats(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    }, [userId]); // add location to the dependency array


    async function deleteCat(catid) {
        try {
            const response = await fetch(`http://192.168.1.251:3001/api/cat/delete/${catid}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete cat with id ${catid}`);
            }

            const data = await response.json();
            console.log(`Deleted cat with id ${catid}`);
            deletelocation.reload(); // 在這裡重新加載頁面
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditClick = (catid) => {
        navigate(`/staff/editcat/${catid}`);
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
            <br />
            <h3>Cat List</h3>
            <form onSubmit={handleSearch}>
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="location">Location:</label>
                        <select
                            id="location"
                            className="form-control"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="Sha Tin">Sha Tin</option>
                            <option value="Kwun Tong">Kwun Tong</option>
                            <option value="Mong Kok">Mong Kok</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            name="age"
                            value={age}
                            onChange={(event) => setAge(event.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="breed">Breed:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="breed"
                            name="breed"
                            value={breed}
                            onChange={(event) => setBreed(event.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            className="form-control"
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="available">available</option>
                            <option value="holding">holding</option>
                            <option value="unavailable">unavailable</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <br />
                        <button type="submit" className="form-control btn btn-primary">
                            Search
                        </button>
                    </div>
                </div>
            </form>


            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {cats && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Location</th>
                            <th>Name</th>
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
                                    <button onClick={() => handleEditClick(cat.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    &nbsp;
                                    <button onClick={() => deleteCat(cat.id)}>
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

export default UserHome;
