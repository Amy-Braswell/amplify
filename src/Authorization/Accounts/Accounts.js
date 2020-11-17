import React, { createContext } from 'react'
import { useDispatch } from 'react-redux'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

import { Error } from '../../Redux/actions/index'
import { LogIn, LogOut} from '../Login/actions'
import { UserName } from './actions'
import Pool from '../UserPool'


const AccountContext = createContext()

const Account = props => {
  const dispatch = useDispatch()

  // Keep user logged in for 24 hours if CognitoUser tokens are still in local storage
  const CognitoUserToken = localStorage.getItem('CognitoIdentityServiceProvider.2mdojf7uivcfipu0t1a005o98a.ab06645c-4076-4143-9a91-53ca7fefcd72.accessToken')
  // console.log({CognitoUserToken})  
  if (CognitoUserToken) {
  if (CognitoUserToken.exp * 1000 < Date.now()) {
      dispatch(LogOut())
    } else{ dispatch(LogIn())}
  }

  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser()
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject()
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err)
                } else {
                  const results = {}

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute
                    results[Name] = Value
                  }

                  resolve(results)
                }
              })
            })

            resolve({
              user,
              ...session,
              ...attributes
            })
          }
        })
      } else {
        reject()
      }
    })

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool })
      const authDetails = new AuthenticationDetails({ Username, Password })

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          const accessToken = data.getAccessToken()
          resolve(accessToken)
          user.getUserAttributes(function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err))
                return;
            }
            const username= result[2].getValue()
            dispatch(UserName(username))       
          })
        },

        onFailure: err => {
          dispatch(Error(err)) 
          reject(err)
        },

        newPasswordRequired: data => {
          dispatch(Error(`new password required: ${data}`)) 
          resolve(data)
        }
      });
    });
    
  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession
      }}
    >
      {props.children}
    </AccountContext.Provider>
  )
}

export { Account, AccountContext }