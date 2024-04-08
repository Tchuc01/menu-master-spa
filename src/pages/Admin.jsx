import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';
import Category from '../shared/components/Category';
import Product from '../shared/components/Product';

const Admin = () => {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [productName, setProductName] = useState('');
  
    const handleCloseCategoryModal = () => setShowCategoryModal(false);
    const handleShowCategoryModal = () => setShowCategoryModal(true);
    const handleCloseProductModal = () => setShowProductModal(false);
    const handleShowProductModal = () => setShowProductModal(true);
  
    const handleAddCategory = () => {
      // Lógica para adicionar categoria
      handleCloseCategoryModal();
    };
  
    const handleAddProduct = () => {
      // Lógica para adicionar produto
      handleCloseProductModal();
    };

    const data = [
        {
          id: 1,
          category: 'Principal',
          items: [
            { id: 1, name: 'Parmegiana', 
                     price: 21.90,
                     rating: 5,
                     image:'https://cooknenjoy.com/wp-content/uploads/2022/02/Bife-a-Parmegiana-02-1920x1442.jpg',
                     description: 'Bife à parmegiana com arroz e batata frita'
            },
            { id: 2, name: 'Bife', 
                     price: 8.5,
                     rating: 4.5,
                     description: 'Bife com fritas',
                     image: 'https://www.minhareceita.com.br/app/uploads/2022/10/2647-bife-bovino-de-churrasco-alemao-rindersteak-1-aspect-ratio-270-260.jpg' 
            },
          ],
        },
        {
          id: 2,
          category: 'Bebidas',
          items: [
            { id: 3, name: 'Coca-Cola', price: 8, rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxG53Ui_cpIf9t1aosCovBKavvv5NZ16QBB8mcQTwM5Q&s'},
            { id: 4, name: 'Suco', price: 25 },
          ],
        },
      ];
  
    return (
        <div id='admin'>
            <div className="header">
            <div className="logo">Logo Aqui</div>
            <a href='/login'><FontAwesomeIcon className='icon-cog' icon={faSignOutAlt} /></a>
        </div>
        
        <div className='admin-options'>
            <h3>Categorias</h3>
            <Button variant="danger" className='round-button' onClick={handleShowCategoryModal}><FontAwesomeIcon icon={faPlus} /></Button>
            <Category data={data} />
            <hr />
            <h3>Produtos</h3>
            <Button variant="danger" className='round-button' onClick={handleShowProductModal}><FontAwesomeIcon icon={faPlus} /></Button>
            <Product data={data} />
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
                <Form.Control type="text" placeholder="Digite a descrição do produto" className='mt-4' value={productName} onChange={(e) => setProductName(e.target.value)} />
                <Form.Select aria-label="Selecione a categoria" className='mt-4'>
                    <option>Selecione a categoria</option>
                    {data.map((category) => (
                         <option value={category.id}>{category.category}</option>
                    ))}
                </Form.Select>
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
  