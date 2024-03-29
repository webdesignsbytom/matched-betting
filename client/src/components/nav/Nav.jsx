import React, { useContext } from 'react';
import './style.css';
import Logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserContext } from '../../context/UserContext';

import { userSampleData } from '../../utils/UserData'



function Nav() {
  console.log('XXX nav');
  const { user, setUser } = useContext(UserContext);
  
  const initUserState = userSampleData
  const navigate = useNavigate();

  const signOut = (event) => {
    event.preventDefault();
    
    setUser(initUserState)
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
    navigate('../', { replace: true });
  };

  return (
    <nav className='nav__container'>
      <div className='nav__logo__container'>
        <Link to='/'>
          <img src={Logo} alt='Matched Betting' />
        </Link>
      </div>

      <div className='nav__links__container'>
        <Link to='/'>Home</Link>
        <Link to='/calculator'>Calculator</Link>
        <Link to='/lessons'>Lessons</Link>
        <Link to='/forum'>Forum</Link>
        <Link to='/faq'>FAQ</Link>
        <Link to='/links'>Links</Link>
      </div>

      {/* EVENTUALLY MAKE THESE CONDITION SO ONLY ONE IS SHOWN */}
      <div className='nav__user__features'>
        <div className='login__container'>
          {user.email
            ? 
              <div className='loggedIn__links'>
                <Link to='/account' key={1} className='account__icon'>
                  <AccountCircleIcon />
                </Link>

                <Link to='/home' onClick={signOut} key={2}>
                  Sign Out
                </Link>

              </div>

            : 
              <div className='loggedOut__links'>
              
                <Link to='/login' key={3}>Login</Link>
                <Link to='/register' key={4}>Register</Link>
              
              </div>}
        </div>

      </div>
    </nav>
  );
}

export default Nav;
