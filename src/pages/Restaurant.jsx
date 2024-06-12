import { faCog, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../service/api';
import Categories from '../shared/components/Categories';
import Footer from '../shared/components/Footer';


const Restaurant = () => {

  const [restaurantInfo, setRestaurantInfo] = useState(null);
  let { username } = useParams();

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      api.get(`/restaurant/${username}`)
        .then(response => {
          console.log(response.data);
          setRestaurantInfo(response.data);
        })
        .catch(error => {
          console.error(error);
          window.location.href = '/';
        });
    };

    fetchRestaurantInfo();
  }, [username]);
  
  return (
    <div id='restaurant'>
      <div className="header">
        <div className="logo">
          <img src={restaurantInfo?.logo} alt="Restaurant Logo" />
        </div>
        <div className="search-div input-group mb-3">
          <input type="text" className="form-control" placeholder="Pesquisar" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2"><FontAwesomeIcon className='text-dark' icon={faMagnifyingGlass} /></button>
        </div>
        <a href='/admin'><FontAwesomeIcon className='icon-cog' icon={faCog} /></a>
      </div>

      <div className="container">
         {restaurantInfo && <Categories restaurantId={restaurantInfo.id} />}
      </div>
      <Footer />
    </div>
  );
};

export default Restaurant;
