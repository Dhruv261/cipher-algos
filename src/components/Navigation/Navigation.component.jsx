import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

const Navigation = () => {
  const { userLogged, setUserLogged } = useContext(UserContext);
  const LoginC = () => {
    return (
      <Link
        to='/authentication'
        className='mr-6 cursor-pointer hover:text-blue-800'
      >
        Login/Signup
      </Link>
    );
  };

  const NewCipher = () => {
    return (
      <Link to='/pass-creater' className='mr-6 cursor-pointer hover:text-blue-800'>New Password</Link>
    );
  };

  const LogoutC = () => {
    return (
      <li
        className='mr-6 cursor-pointer hover:text-blue-800'
        onClick={logoutUser}
      >
        Logout
      </li>
    );
  };

  const logoutUser = () => {
    // sessionStorage.removeItem('token');
    sessionStorage.clear();
    setUserLogged(false);
  };

  return (
    <div className='flex items-center justify-around h-16 bg-indigo-500 text-gray-50'>
      <div className='text-3xl cursor-pointer hover:text-blue-800'>
        <Link to='/'>CRYPTIC</Link>
      </div>
      <div>
        <div className='flex flex-row text-lg'>
          {userLogged === false ? (
            <LoginC />
          ) : (
            <ul className='flex'>
              <NewCipher />
              <LogoutC />
            </ul>
          )}
          {/* <li className='cursor-pointer hover:text-blue-800'>Signup</li> */}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
