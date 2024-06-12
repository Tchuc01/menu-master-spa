import { faMagnifyingGlass, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React  from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../service/api';
import MainLogo from '../shared/components/MainLogo';

const fetchRestaurants = async () => {
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000)); // kkkkkkkkkkkkkk
    const response = await api.get('/restaurants');
    return response.data;
};

const Home = () => {
    const { data: restaurants, isLoading } = useQuery('restaurants', fetchRestaurants);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredRestaurants = !isLoading && restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div id='home'>
            <div className="main-header">
                <MainLogo />
                <div class="search-div input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar restaurante"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"><FontAwesomeIcon className='text-dark' icon={faMagnifyingGlass} /></button>
                </div>
            </div>

            <div className="container">
                <div className='restaurant-title'>
                    <FontAwesomeIcon icon={faUtensils} size='2x' />
                    <h2>Restaurantes disponíveis</h2>
                </div>
                {isLoading ? (
                    <div style={{marginTop: '50px'}}>
                    <div class="snippet" data-title="dot-flashing">
                        <div class="stage">
                        <div class="dot-flashing"></div>
                        </div>
                    </div>
                    </div>
                ) : (
                    restaurants.map(restaurant => (
                    <div
                        key={restaurant.id}
                        className={`restaurant-card ${searchText !== '' && !restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ? 'd-none' : ''}`}
                        onClick={() => window.location.href = `/${restaurant.username}`}
                    >
                        <h3 className='restaurant-name'>{restaurant.name}</h3>
                        <img className='restaurant-logo' src={restaurant.logo} alt={restaurant.name} />
                    </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;