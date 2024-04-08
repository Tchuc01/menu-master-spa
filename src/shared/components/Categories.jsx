import StarRating from './StarRating';

const Categories = ({ data }) => {
  return (
    <div>
      {data.map((category) => (
        <div key={category.id} className="category">
          <h2>{category.category}</h2>
          <div className="items">
            {category.items.map((item) => (
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
          <hr />
        </div>
        
      ))}
    </div>
  );
};

export default Categories;