import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';
import api from '../../service/api';

const Category = ({ data }) => {
  const token = localStorage.getItem('token');

  const handleDeleteCategory = (id) => {
    api.delete(`/category/`,{
      data: { id: id },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        console.log('deletado');
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="categories">
        {data.map((category) => (
          <div key={category.id} className="category">
            <div className="items-category">
                <div className="item-card-category">
                  <div className='item-info-container'>
                      <span className='d-flex align-items-baseline'>
                          <h3>{category.name}</h3>
                      </span>
                  </div>
                  <div className="options">
                    <Button variant="danger" className='round-button' onClick={() => handleDeleteCategory(category.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;