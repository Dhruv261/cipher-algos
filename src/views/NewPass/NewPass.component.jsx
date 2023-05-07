import './NewPass.style.css';
import Navigation from '../../components/Navigation/Navigation.component';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const NewPassComp = () => {
  const [passTitle, setPassTitle] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
const navigate = useNavigate();
  const onHandleSubmit = () => {
    // console.log('working');
    try {
      const data = {
        title: passTitle,
        cipherPassword: password,
      };
      if (password === confirmPassword) {
        fetch('http://localhost:3001/new-cipher-pass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            if(data.response === 200) {
              navigate('/');
            }
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log('Error in setting password');
    }
  };

  return (
    <div>
      <Navigation />
      <div className='NewPassComp'>
        <div>
          <div>
            <input
              type='text'
              name=''
              id='passTitle'
              placeholder='Password Title'
              className='input-newpass'
              onChange={(e) => {
                setPassTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Enter Password'
              name=''
              id='password'
              className='input-newpass'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Confirm Password'
              name=''
              id='passwordConfirm'
              className='input-newpass'
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <button onClick={onHandleSubmit} className='new-pass-button'>Submit</button>
      </div>
    </div>
  );
};

export default NewPassComp;
