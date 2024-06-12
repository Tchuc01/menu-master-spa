import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import api from '../../service/api';

const Product = ({ data, categories }) => {
  const token = localStorage.getItem('token');

  const [showProductModal, setShowProductModal] = useState(false);

  const handleCloseProductModal = () => setShowProductModal(false);
  const handleShowProductModal = () => setShowProductModal(true);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setFormCategoryImage] = useState(null);
  const [productID, setFormCategoryID] = useState(null);

  const [restaurantCategories, setRestaurantCategories] = useState(null);

  const handleDeleteProduct = (id) => {
      api.delete(`/product/`,{
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

  const handleEditProduct = (id) => {
    api.get(`/product/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        console.log(response.data.name);
        setProductName(response.data.name);
        setProductDescription(response.data.description);
        setProductPrice(response.data.price);
        setProductCategory(response.data.categoryID);
        setFormCategoryImage(response.data.image);
        setFormCategoryID(response.data.id);

        handleShowProductModal();
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  const handleAddProduct = () => {
    const formData = new FormData();
      formData.append('name', productName);
      formData.append('image', productImage);
      formData.append('price', productPrice);
      formData.append('description', productDescription);
      formData.append('categoryID', productCategory);
      formData.append('options', '[1,2,3]');
      formData.append('id', productID);


      api.put(`/product`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => {
          console.log('adicionado');
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
        });

      handleCloseProductModal();
  };

  return (
    <div className="products">
      {data.map((product) => (
          <div key={product.id} className="item-card">
            <div className='item-info-container'>
                <span className='d-flex align-items-baseline'>
                    <h3 className='item-name'>{product.name}</h3>
                    <p className='item-price'>R${product.price}</p>
                </span>
                <span>{product.description}</span>
                <div className="options">
                    <Button variant="white" className='round-button custom-border'onClick={() => handleEditProduct(product.id)}><FontAwesomeIcon icon={faPencil} /></Button>
                    <Button variant="danger" className='round-button' onClick={() => handleDeleteProduct(product.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>
            </div>
            <div className='item-image-container'>
                <img src={product.image} alt={product.name} />
            </div>
          </div>
        ))}

        <Modal show={showProductModal} onHide={handleCloseProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Produto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Control type="text" placeholder="Digite o nome do produto" value={productName} onChange={(e) => setProductName(e.target.value)} />
                <Form.Control type="text" placeholder="Digite a descrição do produto" className='mt-4' value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                <Form.Control type="number" placeholder="Digite o preço do produto" className='mt-4' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                <Form.Select aria-label="Selecione a categoria" className='mt-4' onChange={(e) => setProductCategory(e.target.value)}>
                  <option>Selecione a categoria</option>
                  {Object.values(categories).map((category) => (
                        <option value={category.id}>{category.name}</option>
                  ))}
                </Form.Select>
                <Form.Label className='mt-4'>Imagem do Produto</Form.Label>
                <Form.Control type="file" onChange={(e) => setFormCategoryImage(e.target.files[0])} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProductModal}>Fechar</Button>
            <Button variant="danger" onClick={handleAddProduct}>Salvar</Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default Product;