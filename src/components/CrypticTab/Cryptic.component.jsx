import { useContext, useEffect, useState } from 'react';
import './Cryptic.style.css';
import { UserContext } from '../../context/user.context';
const Cryptic = () => {
  const { userLogged } = useContext(UserContext);

  const [passList, setPassList] = useState('');
  const [toUsePassword, setToUsePassword] = useState();
  const [toUsePasswordUnauth, setToUsePasswordUnauth] = useState();
  const [message, setMessage] = useState('');
  const [returnedMessage, setReturnedMessage] = useState('');
  const [algo, setAlgo] = useState('blowfish');
  const [passwordNotSelected, setPasswordNotSelected] = useState('');

  // -------------------------------------------------------------------------
  useEffect(() => {
    fetch('http://localhost:3001/pass-list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: 'Bearer' + sessionStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPassList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const toSendData = {
    key: toUsePassword,
    message,
    algo,
  };

  const toSendDataUnauth = {
    key: toUsePasswordUnauth,
    message,
    algo,
  };

  // const isPasswordSelected = () => {
  //   if (toUsePassword === 'Select Your Password') {
  //     setPasswordNotSelected('Please select your password!');
  //   } else {
  //   }
  // };

  const encryptRequest = async () => {
    // e.preventDefault();
    console.log('encryptRequest Working');
    fetch('http://localhost:3001/encrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: 'Bearer' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(toSendData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReturnedMessage(data.encrypted);
      })
      .catch((error) => console.log(error));
  };

  const encryptReqUnAuth = async () => {
    // e.preventDefault();
    console.log('unauth encrypt');
    console.log('encryptRequest Working');
    fetch('http://localhost:3001/encrypt-unauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSendDataUnauth),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReturnedMessage(data.encrypted);
      })
      .catch((error) => console.log(error));
  };

  const decryptRequest = async () => {
    // e.preventDefault();
    console.log('encryptRequest Working');
    fetch('http://localhost:3001/decrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: 'Bearer' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(toSendData),
    })
      .then((response) => response.json())
      .then((data) => {
        const result = data.decrypted;
        setReturnedMessage(result.replace(/\u0000/g, ''));
      })
      .catch((error) => console.log(error));
  };

  const decryptRequestUnauth = () => {
    // e.preventDefault();
    console.log('encryptRequest Working');
    fetch('http://localhost:3001/decrypt-unauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSendDataUnauth),
    })
      .then((response) => response.json())
      .then((data) => {
        const result = data.decrypted;
        setReturnedMessage(result.replace(/\u0000/g, ''));
      })
      .catch((error) => console.log(error));
  };

  const encryptRequestFunc = () => {
    if (userLogged.length > 1) {
      encryptRequest();
    } else {
      encryptReqUnAuth();
    }
  };

  const decryptRequestFunc = () => {
    if (userLogged.length > 1) {
      decryptRequest();
    } else {
      decryptRequestUnauth();
    }
  };

  return (
    <>
      <div className='option-container-cryptic'>
        <select
          className='select-cryptic'
          onChange={(e) => setAlgo(e.target.value)}
        >
          <option className='options-cryptic' value='blwofish'>
            Blowfish
          </option>
          <option className='options-cryptic' value='aes'>
            AES
          </option>
          <option className='options-cryptic' value='tripleDes'>
            Triple DES
          </option>
          <option className='options-cryptic' value='des'>
            DES
          </option>
        </select>
      </div>
      {userLogged.length > 1 ? (
        <div className='option-container-cryptic'>
          {passList.length > 0 ? (
            <select
              name=''
              id=''
              onChange={(e) => {
                setToUsePassword(e.target.value);
              }}
              className='select-cryptic'
            >
              <option>Select Your Password</option>
              {passList.map((option) => (
                <option
                  className='options-cryptic'
                  key={option._id}
                  value={option.passwordOrg}
                >
                  {option.title}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      ) : (
        <div className='option-container-cryptic'>
          <input type="text" name="" id="" placeholder='Enter your password.' className='input-password-cryptic' onChange={(e) => {
            setToUsePasswordUnauth(e.target.value);
          }}/>
        </div>
      )}

      <div className='w-full cryptic-container'>
        <div>
          <textarea
            type='text'
            name=''
            id=''
            className='message-box message-input'
            placeholder='Enter your plain text/Cipher Text'
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div>
          <textarea
            type='text'
            className='message-box message-output'
            placeholder='Encrypted Text'
            value={returnedMessage}
            editable='false'
            readOnly
            resize='false'
          />
        </div>
      </div>
      <div className='button-div'>
        <div>
          <button onClick={encryptRequestFunc} className='cipher-buttons'>
            Encrypt
          </button>
          <button onClick={decryptRequestFunc} className='cipher-buttons'>
            Decrypt
          </button>
        </div>
      </div>
    </>
  );
};

export default Cryptic;
