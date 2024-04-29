import { faMagnifyingGlass, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../service/api';
import MainLogo from '../shared/components/MainLogo';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/restaurants')
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleRestaurantClick = (restaurantId) => {
      localStorage.setItem('selectedRestaurantId', restaurantId);
      navigate('/Restaurant');
  };

    return (
        <div id='home'>
            <div className="main-header">
                <MainLogo />
                <div class="search-div input-group mb-3">
                    <input type="text" class="form-control" placeholder="Pesquisar restaurante" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"><FontAwesomeIcon className='text-dark' icon={faMagnifyingGlass} /></button>
                </div>
            </div>

            <div className="container">
                <div className='restaurant-title'>
                    <FontAwesomeIcon icon={faUtensils} size='2x' />
                    <h2>Restaurantes disponíveis</h2>
                </div>
                {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="restaurant-card"  onClick={() => handleRestaurantClick(restaurant.id)}>
                        <h3 className='restaurant-name'>{restaurant.name}</h3>
                        <img className='restaurant-logo' src={restaurant.logo} alt={restaurant.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;