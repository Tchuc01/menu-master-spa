import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';

const Category = ({ data }) => {
  return (
    <div className="categories">
      {data.map((category) => (
        <div key={category.id} className="category">
          <div className="items-category">
              <div className="item-card-category">
                <div className='item-info-container'>
                    <span className='d-flex align-items-baseline'>
                        <h3>{category.category}</h3>
                    </span>
                </div>
                <div className="options">
                 <Button variant="white" className='round-button custom-border'><FontAwesomeIcon icon={faPencil} /></Button>
                 <Button variant="danger" className='round-button'><FontAwesomeIcon icon={faTrash} /></Button>
                </div>
              </div>
          </div>
        </div>
        
      ))}
    </div>
  );
};

export default Category;