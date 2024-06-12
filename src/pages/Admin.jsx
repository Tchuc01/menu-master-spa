import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';
import Category from '../shared/components/Category';
import Product from '../shared/components/Product';
import api from '../service/api';

const Admin = () => {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setFormCategoryImage] = useState(null);
  
    const handleCloseCategoryModal = () => setShowCategoryModal(false);
    const handleShowCategoryModal = () => setShowCategoryModal(true);
    const handleCloseProductModal = () => setShowProductModal(false);
    const handleShowProductModal = () => setShowProductModal(true);

    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [restaurantMenu, setRestaurantMenu] = useState(null);
    const [restaurantCategories, setRestaurantCategories] = useState(null);
    const [restaurantProducts, setRestaurantProducts] = useState(null);

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    useEffect(() => {
      const fetchRestaurantInfo = async () => {
        api.get(`/restaurant/${username}`)
          .then(response => {
            console.log('Restaurant Info:');
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

    useEffect(() => {
      const fetchRestaurantMenu = async () => {
        api.get(`/products/${restaurantInfo?.id}`)
          .then(response => {
            console.log(response.data);
            setRestaurantMenu(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      };
    
      const fetchRestaurantCategories = async () => {
        api.get(`/categories/${restaurantInfo?.id}`)
          .then(response => {
            console.log('Restaurant categories:');
            console.log(response.data);
            setRestaurantCategories(response.data);
          })
          .catch(error => {
            console.log('Error:');
            console.error(error);
            window.location.href = '/';
          });
      };

      const fetchRestaurantProducts = async () => {
        api.get(`/products/${restaurantInfo?.id}`)
          .then(response => {
            console.log('Restaurant products:');
            console.log(response.data);
            setRestaurantProducts(response.data);
          })
          .catch(error => {
            console.log('Error:');
            console.error(error);
            window.location.href = '/';
          });
      };
    
      if (restaurantInfo?.id) {
        fetchRestaurantMenu();
        fetchRestaurantCategories();
        fetchRestaurantProducts();
      }
    }, [restaurantInfo?.id]);

    let categories = {};

    if (restaurantCategories) {
      categories = restaurantCategories.reduce((acc, category) => {
        acc[category.id] = {
          id: category.id,
          name: category.name,
        };
        return acc;
      }, {});
    }

    let products = {};

    if (restaurantProducts) {
      products = restaurantProducts.reduce((acc, product) => {
        acc[product.id] = {
          id: product.id,
          name: product.name,
          description: product.description,
          options: JSON.parse(product.options),
          price: product.price,
          image: product.image,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          category: product.category,
          restaurant: product.restaurant,
          averageRating: product.averageRating,
        };
        return acc;
      }, {});
    }

    const handleAddCategory = () => {
      api.post(`/category`,{name: categoryName},{
        headers: {
          'Content-Type': 'application/json',
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

      handleCloseCategoryModal();
    };
  
    const handleAddProduct = () => {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('image', productImage);
      formData.append('price', productPrice);
      formData.append('description', productDescription);
      formData.append('categoryID', productCategory);
      formData.append('options', '[1,2,3]');


      api.post(`/product`, formData,{
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

    console.log(restaurantMenu);

    return (
        <div id='admin'>
            <div className="header">
              <div className="logo">
                {restaurantInfo && (
                  <img src={restaurantInfo.logo} alt={restaurantInfo.name} />
                )}
              </div>
            <a href='/login'><FontAwesomeIcon className='icon-cog' icon={faSignOutAlt} /></a>
        </div>
        
        <div className='admin-options'>
            <h3>Categorias</h3>
            <Button variant="danger" className='round-button' onClick={handleShowCategoryModal}><FontAwesomeIcon icon={faPlus} /></Button>
            <Category data={Object.values(categories)} />
            <hr />
            <h3>Produtos</h3>
            <Button variant="danger" className='round-button' onClick={handleShowProductModal}><FontAwesomeIcon icon={faPlus} /></Button>
            <Product data={Object.values(products)} />
        </div>
        {/* Modal para Adicionar Categoria */}
        <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Categoria</Modal.Title>
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
            <Button variant="primary" onClick={handleAddCategory}>Adicionar</Button>
          </Modal.Footer>
        </Modal>
  
        {/* Modal para Adicionar Produto */}
        <Modal show={showProductModal} onHide={handleCloseProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Produto</Modal.Title>
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
            <Button variant="danger" onClick={handleAddProduct}>Adicionar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  
  export default Admin;
  