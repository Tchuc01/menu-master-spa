import StarRating from './StarRating';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../service/api';

const Categories = ({ restaurantId }) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  let { username } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [productID, setProductID] = useState(null);

  const handleStarClick = (starNumber) => {
    setRating(starNumber);
  };

  const handleVote = () => {
    api.post(`/rating`,{
      productID: productID,
      rate: rating
      },
      {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        console.log('Avaliado');
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });

    setShowModal(false);
  };

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      api.get(`/products/${restaurantId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log(response.data);
          setRestaurantMenu(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    fetchRestaurantMenu();
  }, [username, restaurantId]);

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
                  <StarRating rating={item.averageRating} />
                  <button className='btn btn-outline-danger vote-btn' onClick={() => {
                    setShowModal(true);
                    setProductID(item.id);
                  }}>Avaliar</button>
                </div>
                <div className='item-image-container'>
                  <img src={item.image} alt={item.name} />
              </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="vote-modal">
        <Modal.Header>
          <Modal.Title>Avaliar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleStarClick(ratingValue)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  color={ratingValue <= rating ? "red" : "#e4e5e9"}
                  size="lg"
                />
              </button>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="danger" onClick={handleVote}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;