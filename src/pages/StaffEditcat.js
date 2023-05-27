import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const StaffEditcat = () => {
    const { catid } = useParams();
    const navigate = useNavigate();

    console.log(catid);

    const [location, setLocation] = useState('Sha Tin');
    const [status, setStatus] = useState('available');
    const [cat, setCat] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // get cat detail from api
    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.1.251:3001/api/cat/getcat/${catid}`)
            .then(res => {
                setCat(res.data[0]);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            });
    }, [catid]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCat(prevCat => ({
            ...prevCat,
            [name]: value
        }));
    };

    // update cat via api
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(cat);
        axios.put(`http://192.168.1.251:3001/api/cat/update/${catid}`,cat)
            .then(res => {
                console.log(res);
                navigate('/staff/home');
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            });
    };

    return (
        <div>
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
            <h3>Edit Cat</h3>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <img src={`http://192.168.1.251:3001/uploads/${cat.image}`} alt={cat.name} width="50" />
                <div className="form-group">
                    <label htmlFor="name">CATID: </label>
                    {cat.id || ''}
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label><br />
                    <select id="location" value={cat.location} onChange={(e) => setCat({ ...cat, location: e.target.value })}>
                        <option value="Sha Tin">Sha Tin</option>
                        <option value="Kwun Tong">Kwun Tong</option>
                        <option value="Mong Kok">Mong Kok</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={cat.name || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="text" className="form-control" id="age" name="age" value={cat.age || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="Breed">Breed</label>
                    <input type="text" className="form-control" id="Breed" name="Breed" value={cat.Breed || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label><br />
                    <select id="status" value={cat.status} onChange={(e) => setCat({ ...cat, status: e.target.value })}>
                        <option value="available">available</option>
                        <option value="holding">holding</option>
                        <option value="unavailable">unavailable</option>
                    </select>
                </div><br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );

}

export default StaffEditcat;