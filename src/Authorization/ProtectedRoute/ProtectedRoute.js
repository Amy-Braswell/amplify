import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

function ProtectedRoute({ component: Component, ...rest }) {
  const isAuth = useSelector(state => state.isAuth)
                   
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? <Redirect to='/login' /> : <Component {...props} />
      }
    />

  )
}

export default ProtectedRoute