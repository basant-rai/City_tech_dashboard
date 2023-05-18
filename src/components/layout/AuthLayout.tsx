import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import jsCookie from "js-cookie";


const AuthLayout = () => {
  const accessToken = jsCookie.get('city_token');
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken === undefined || !accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  return (
    <div>
      {
        !accessToken ?
          <>
            {navigate('/')}
          </> :
          <Outlet />


      }
    </div>
  )
}

export default AuthLayout