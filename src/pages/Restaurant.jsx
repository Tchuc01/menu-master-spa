import { faCog, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../service/api';
import Categories from '../shared/components/Categories';
import Footer from '../shared/components/Footer';

const Restaurant = () => {;
  const selectedRestaurantId = localStorage.getItem('selectedRestaurantId');
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/products/' + selectedRestaurantId)
      .then(response => {
        console.log(response.data);
        const product = response.data;

        if (!product || !product.category || !product.category.id || !product.category.name) {
          console.error("Product data is incomplete or invalid.");
          return;
        }

        const groupedProducts = [{
          id: product.category.id,
          category: product.category.name,
          products: [{
            id: product.id,
            name: product.name,
            price: product.price,
            rating: product.averageRating,
            description: product.description,
            image: product.image
          }]
        }];

        setData(groupedProducts);

        console.log(groupedProducts);
        // Faça o que quiser com groupedProducts, como armazenar em um estado para renderizar na UI
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

  return (
    <div id='restaurant'>
      {/* Header */}
      <div className="header">
        <div className="logo">Logo Aqui</div>
        <div class="search-div input-group mb-3">
            <input type="text" class="form-control" placeholder="Pesquisar" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button class="btn btn-outline-secondary" type="button" id="button-addon2"><FontAwesomeIcon className='text-dark' icon={faMagnifyingGlass} /></button>
        </div>
        <a href='/admin'><FontAwesomeIcon className='icon-cog' icon={faCog} /></a>
      </div>

      <div className="container">
        <Categories data={data} />
      </div>
      <Footer/>
    </div>
  );
};

export default Restaurant;
