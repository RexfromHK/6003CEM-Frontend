import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatBreedSelector = () => {
    const [catBreeds, setCatBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');

    useEffect(() => {
        axios
            .get('https://api.thecatapi.com/v1/breeds')
            .then((response) => {
                setCatBreeds(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChange = (event) => {
        setSelectedBreed(event.target.value);
    };

    return (
        <div>
            <label htmlFor="breed-select">Select a breed:</label>
            <select id="breed-select" value={selectedBreed} onChange={handleChange}>
                <option value="">Select a breed</option>
                {catBreeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </select>
            {selectedBreed && (
                <img
                    src={`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed}`}
                    alt={catBreeds.find((breed) => breed.id === selectedBreed).name}
                />
            )}
        </div>
    );
};

export default CatBreedSelector;
