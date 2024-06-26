import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../shared/components/MainLogo';
import api from '../service/api';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    api.post('/restaurant/login', {
      username: formData.username,
      password: formData.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const { token } = response.data;
  
        localStorage.setItem('token', token);
        localStorage.setItem('username', formData.username);
  
        navigate('/admin');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRegister = async ()=>{
    navigate('/register');
  }

  return (
    <div className='card-container'>
        <div className='card d-flex flex-column align-items-center'>
            <MainLogo className="mb-4"/>
            <form className='d-flex flex-column align-items-center btn-100' onSubmit={handleSubmit}>
                <input className='form-control mb-3' type="text" name="username" placeholder="Usuário" onChange={handleChange} />
                <input className='form-control mb-3' type="password" name="password" placeholder="Senha" onChange={handleChange} />
                <button className='btn btn-danger btn-100' type="submit">Logar</button>
            </form>
            <a className='txt-bt' href='' onClick={handleRegister}>
              Não tem uma conta? Faça seu cadastro aqui!
            </a>
        </div>
    </div>
  );
};

export default Login;