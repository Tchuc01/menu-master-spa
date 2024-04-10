import React, { useState } from 'react';
import api from '../service/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    logo: null,
  });
  
  const handleChange = (e) => {
    console.log(FormData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo: file,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = new FormData();
  
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  
    api.post('/restaurant', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      })
      .then((response) => {
        console.log(response.data);
        setFormData({
          username: '',
          password: '',
          name: '',
          logo: null,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='card-container'>
        <div className='card d-flex flex-column align-items-center'>
            <div className='logo-image'></div>
            <h2 className='logo-name mb-4'>Menu Master</h2>
            <form className='d-flex flex-column align-items-center btn-100' onSubmit={handleSubmit}>
                <input className='form-control mb-3' type="text" name="username" placeholder="Usuário" onChange={handleChange} />
                <input className='form-control mb-3' type="password" name="password" placeholder="Senha" onChange={handleChange} />
                <input className='form-control mb-3' type="text" name="name" placeholder="Nome do restaurante" onChange={handleChange} />
                <input className='form-control mb-3' type="file" name="logo" onChange={handleLogoChange} />
                <button className='btn btn-danger btn-100' type="submit">Registrar</button>
            </form>
        </div>
    </div>
  );
};

export default Register;