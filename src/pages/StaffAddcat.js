import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StaffAddcat = props => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = sessionStorage.getItem('userId');
    console.log(userId); 

    const [result, setResult] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [image, setImage] = useState('');
    const [location, setlocation] = useState('Sha Tin');


    // add cat via api
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('breed', breed);
        formData.append('image', image);
        formData.append('userId', userId);
        formData.append('location', location);

        try {
            const response = await axios.post(
                'http://192.168.1.251:3001/api/cat/add',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setResult(`Status Codes ${response.status} : ${response.data}`);
        } catch (error) {
            console.error(error);
            if (error.response) {
                setResult(`Status Codes ${error.response.status} : ${error.response.data}`);
            } else {
                setResult('An error occurred while processing your request.');
            }
        }
    };

    // cat api detection
    const API_KEY = 'live_QK9dGMpaYi7wiY1Z56yrWrfBurec9qua00aFfceZJT2S91eE2O2kD23Mu8Y53j3t';
    const API_URL = `https://api.thecatapi.com/v1/images/upload`;

    const detectBreed = async (image) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', image);

            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-api-key': API_KEY
                }
            });

            const uploaddata = response.data;
            const imageUrl = uploaddata.url;
  


            let breed = 'Unknown';

            while (breed === 'Unknown') {
                const breedResponse = await axios.get('https://api.thecatapi.com/v1/images/search', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY
                    },
                    params: {
                        'image_url': imageUrl
                    }
                });

                const data = breedResponse.data;
                console.log(data);

                if (data[0].breeds.length > 0) {
                    breed = data[0].breeds[0].name;
                }
            }
            
            console.log(breed);
            setBreed(breed);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
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
            <h3>Post a Cat</h3>
            <div>
                <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <br />
                        <select id="location" value={location} onChange={(e) => setlocation(e.target.value)}>
                            <option value="Sha Tin">Sha Tin</option>
                            <option value="Kwun Tong">Kwun Tong</option>
                            <option value="Mong Kok">Mong Kok</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            style={{ width: "20%" }} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            value={age}
                            onChange={(event) => setAge(event.target.value)}
                            style={{ width: "20%" }} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="breed">Breed</label>
                        <input
                            type="text"
                            className="form-control"
                            id="breed"
                            value={breed}
                            onChange={(event) => setBreed(event.target.value)}
                            style={{ width: "20%" }} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <br />
                        <input
                            type="file"
                            className="form-control-file"
                            id="image"
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                                detectBreed(event.target.files[0]);
                            }}
                        />
                    </div>
                    <br />

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>

            <div style={{ fontWeight: 'bold' }}>
                {result && <div> {result}</div>}
            </div>


        </div>
    );
}


export default StaffAddcat;