import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../service/api';
import Footer from '../shared/components/Footer';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        api.get('/restaurants')
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div id='home'>
            <div className="main-header">
                <img className='logo' src='https://res.cloudinary.com/dzkrz6yzs/image/upload/v1711504638/jqieuh1y1d85xpbx1uvc.png' alt='Logo' />

                <div class="search-div input-group mb-3">
                    <input type="text" class="form-control" placeholder="Pesquisar" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"><FontAwesomeIcon className='text-dark' icon={faMagnifyingGlass} /></button>
                </div>
            </div>

            <div className="container">
                {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="item-card">
                        <div className='item-info-container'>
                            <h3 className='item-name'>{restaurant.name}</h3>
                        </div>
                        <div className='item-image-container'>
                            <img className='restaurant-logo' src={restaurant.logo} alt={restaurant.name} />
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Home;