import StarRating from './StarRating';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../service/api';

const Categories = ({ restaurantId }) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  let { username } = useParams();

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      api.get(`/products/${restaurantId}`)
        .then(response => {
          console.log(response.data);
          setRestaurantMenu(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    fetchRestaurantMenu();
  }, [username]);

  // Create categories object
  const categories = restaurantMenu?.reduce((acc, product) => {
    const { category } = product;
    if (acc[category.id]) {
      acc[category.id].products.push(product);
    } else {
      acc[category.id] = {
        id: category.id,
        name: category.name,
        products: [product],
      };
    }
    return acc;
  }, {}) || {};

  return (
    <div>
      {Object.values(categories).map((category) => (
        <div key={category.id} className="category">
          <h2>{category.name}</h2>
          <div className="items">
            {category.products.map((item) => (
              <div key={item.id} className="item-card">
                <div className='item-info-container'>
                  <span className='d-flex align-items-baseline'>
                    <h3 className='item-name'>{item.name}</h3>
                    <p className='item-price'>R${item.price}</p>
                  </span>
                  <span>{item.description}</span>
                  <StarRating rating={item.rating} />
                </div>
                <div className='item-image-container'>
                  <img src={item.image} alt={item.name} />
              </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;