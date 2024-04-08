import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';

const Product = ({ data }) => {
  return (
    <div>
      {data.map((category) => (
        <div key={category.id} className="category">
          <div className="products">
            {category.items.map((item) => (
              <div key={item.id} className="item-card">
                <div className='item-info-container'>
                    <span className='d-flex align-items-baseline'>
                        <h3 className='item-name'>{item.name}</h3>
                        <p className='item-price'>{category.category}</p>
                    </span>
                    <span>{item.description}</span>
                    <div className="options">
                        <Button variant="white" className='round-button custom-border'><FontAwesomeIcon icon={faPencil} /></Button>
                        <Button variant="danger" className='round-button'><FontAwesomeIcon icon={faTrash} /></Button>
                    </div>
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

export default Product;