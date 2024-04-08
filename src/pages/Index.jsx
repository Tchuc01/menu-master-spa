import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog , faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Categories from '../shared/components/Categories';

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

  

const Home = () => {
  return (
    <div id='home'>
      {/* Header */}
      <div className="header">
        <div className="logo">Logo Aqui</div>
        <div class="search-div input-group mb-3">
            <input type="text" class="form-control" placeholder="Pesquisar" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button class="btn btn-outline-secondary" type="button" id="button-addon2"><FontAwesomeIcon className='text-dark' icon={faMagnifyingGlass} /></button>
        </div>
        <a href='/admin'><FontAwesomeIcon className='icon-cog' icon={faCog} /></a>
      </div>

      <div className="container">
        <Categories data={data} />
      </div>
    </div>
  );
};

export default Home;
