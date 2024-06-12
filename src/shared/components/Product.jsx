import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';
import api from '../../service/api';

const Product = ({ data }) => {
  const token = localStorage.getItem('token');

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
                    <Button variant="white" className='round-button custom-border'><FontAwesomeIcon icon={faPencil} /></Button>
                    <Button variant="danger" className='round-button' onClick={() => handleDeleteProduct(product.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>
            </div>
            <div className='item-image-container'>
                <img src={product.image} alt={product.name} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Product;