import { useState } from 'react';
import MainLogo from '../shared/components/MainLogo';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o backend ou fazer o que for necessário
    console.log(formData);
  };

  return (
    <div className='card-container'>
        <div className='card d-flex flex-column align-items-center'>
            <MainLogo className="mb-4"/>
            <form className='d-flex flex-column align-items-center btn-100' onSubmit={handleSubmit}>
                <input className='form-control mb-3' type="text" name="username" placeholder="Usuário" onChange={handleChange} />
                <input className='form-control mb-3' type="password" name="password" placeholder="Senha" onChange={handleChange} />
                <button className='btn btn-danger btn-100' type="submit">Logar</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
