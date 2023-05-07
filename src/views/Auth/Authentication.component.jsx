import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

const Authentication = () => {
  const { setUserLogged } = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [name2, setName2] = useState();
  const [email2, setEmail2] = useState();
  const [password2, setPassword2] = useState();
  const [checkPassword2, setCheckPassword2] = useState();

  const [errorLogin, setErrorLogin] = useState();
  const [errorSignin, setErrorSignin] = useState();

  const navigate = useNavigate();

  const data = {
    email: email,
    password: password,
  };
  const dataSignup = {
    name: name2,
    email: email2,
    password: password2,
  };

  const loginFunc = async (e) => {
    e.preventDefault();
    if ((email === '') | (password === '')) {
      console.log('loginFunc if block working.')
      setErrorLogin('Fields cannot be empty');
    } else {
      setErrorLogin('');
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          if (data.response === 200) {
            sessionStorage.setItem('token', data.user.tokens[0].createdToken);
            navigate('/');
            setUserLogged(true);
          }
          if (data.response === 401) {
            setErrorLogin('Please check your login details.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const signupFunc = async (e) => {
    e.preventDefault();
    if (
      (name2 === '') |
      (email2 === '') |
      (password2 === '') |
      (checkPassword2 === '')
    ) {
      setErrorSignin('Please fill all the fields');
    } else if (password2 !== checkPassword2) {
      setErrorSignin("Passwords don't match.");
    } else {
      setErrorSignin('');
      fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSignup),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response === 200) {
            console.log('Working');
            sessionStorage.setItem('token', data.user.tokens[0].createdToken);
            navigate('/');
            setUserLogged(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className='grid content-center h-screen grid-cols-2 justify-items-center z-1'>
      {/* Login */}
      <div className='flex flex-col justify-center px-6 py-9'>
        <p className='pb-5 text-3xl'>Already have an account?</p>
        <p className='text-lg'>Sign in with your email and password</p>
        <input
          type='text'
          className='p-2 my-3 border border-t-0 border-l-0 border-r-0 rounded-sm outline-none'
          name='e-mail'
          placeholder='e-mail'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='p-2 my-3 border border-t-0 border-l-0 border-r-0 rounded-sm outline-none'
          name='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='h-10 my-3 text-center bg-blue-500 rounded-sm'
          onClick={loginFunc}
        >
          Submit
        </button>
        <div className='text-red-600'>{errorLogin}</div>
      </div>
      {/* Sign Up*/}
      <div>
        <div className='flex flex-col justify-center px-6 py-9 '>
          <p className='pb-5 text-3xl'>Don't have an account?</p>
          <p className='text-lg'>Sign up with your email or password</p>
          <input
            type='Name'
            className='p-2 my-3 border border-t-0 border-l-0 border-r-0 rounded-sm outline-none'
            name='Name'
            placeholder='Name'
            onChange={(e) => setName2(e.target.value)}
          />
          <input
            type='text'
            className='p-2 my-3 border border-t-0 border-l-0 border-r-0 rounded-sm outline-none'
            name='e-mail'
            placeholder='e-mail'
            onChange={(e) => setEmail2(e.target.value)}
          />
          <input
            type='password'
            className='p-2 my-3 border border-t-0 border-l-0 border-r-0 rounded-sm outline-none'
            name='password'
            placeholder='Password'
            onChange={(e) => setPassword2(e.target.value)}
          />
          <input
            type='password'
            className='p-2 my-3 border border-t-0 border-l-0 border-r-0 rounded-sm outline-none'
            name='check-password'
            placeholder='Check Password'
            onChange={(e) => setCheckPassword2(e.target.value)}
          />
          <button
            className='h-10 my-3 text-center bg-blue-500 rounded-sm'
            onClick={signupFunc}
          >
            Submit
          </button>
          <div className='text-red-600'>{errorSignin}</div>
        </div>
      </div>
      <div className='absolute inset-1.5 text-blue-800 font-medium text-2xl z-0 h-0'>
        <Link to='/'>HOME</Link>
      </div>
    </div>
  );
};

export default Authentication;
