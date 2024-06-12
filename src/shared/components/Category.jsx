import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../service/api';

const Category = ({ data }) => {
  const [categoryName, setCategoryName] = useState('');

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);
  const handleShowCategoryModal = () => setShowCategoryModal(true);
  

  const token = localStorage.getItem('token');
  const [categoryID, setCategoryID] = useState('');

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

  const handleEditCategory = (id) => {
    api.get(`/category/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        console.log(response.data.name);
        setCategoryName(response.data.name);
        setCategoryID(response.data.id);
        handleShowCategoryModal();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editCategory = (id) => {
    
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
                    <Button variant="white" className='round-button custom-border' onClick={() => handleEditCategory(category.id)}><FontAwesomeIcon icon={faPencil} /></Button>
                    <Button variant="danger" className='round-button' onClick={() => handleDeleteCategory(category.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Control type="text" placeholder="Digite o nome da categoria" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={handleCloseCategoryModal}>Fechar</Button>
          <Button variant="primary" onClick={editCategory}>Editar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;