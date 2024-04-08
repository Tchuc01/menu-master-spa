import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    restaurantName: '',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, logo: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o backend ou fazer o que for necessário
    console.log(formData);
  };

  return (
    <div className='card-container'>
        <div className='card d-flex flex-column align-items-center'>
            <div className='logo-image'></div>
            <h2 className='logo-name mb-4'>Menu Master</h2>
            <form className='d-flex flex-column align-items-center btn-100' onSubmit={handleSubmit}>
                <input className='form-control mb-3' type="text" name="username" placeholder="Usuário" onChange={handleChange} />
                <input className='form-control mb-3' type="password" name="password" placeholder="Senha" onChange={handleChange} />
                <input className='form-control mb-3' type="text" name="restaurantName" placeholder="Nome do restaurante" onChange={handleChange} />
                <input className='form-control mb-3' type="file" name="logo" onChange={handleLogoChange} />
                <button className='btn btn-danger btn-100' type="submit">Registrar</button>
            </form>
        </div>
    </div>
  );
};

export default Register;
