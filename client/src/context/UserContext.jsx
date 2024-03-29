import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { userSampleData } from '../utils/UserData'
import LoggedInUser from '../utils/LoggedInUser';

export const UserContext = React.createContext()

const initUserState = userSampleData

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initUserState)  
  console.log('AAA userContext', user); 

  useEffect(() => {
    const decodedUserData = LoggedInUser()
    console.log('DDD userContext', decodedUserData);
    
    if (decodedUserData) {
      const id = decodedUserData.id
      console.log('DDE id', id);

      fetch(`http://localhost:4000/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data);
          console.log('DDF data', data);
        })
        .catch((error) => {
          console.log('error', error);
        }, []);
    }

  }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider> 
      );
}

export default UserContextProvider