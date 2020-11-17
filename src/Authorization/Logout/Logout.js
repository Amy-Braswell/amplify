import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { LogOut } from '../Login/actions'
import { UserName } from '../Accounts/actions'
import Pool from '../UserPool'


const useStyles = makeStyles((theme) => ({
  form: {
    width: '30%', // Fix IE 11 issue.
    margin: 'auto',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Logout(props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const logout = () => {
    const user = Pool.getCurrentUser()
    if (user) {
      user.signOut()
      dispatch(LogOut())
      dispatch(UserName(''))
    }
  };

  return (
    
    <div>
      <form
          className={classes.form}
          onSubmit={logout} 
          noValidate 
      >
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Logout
        </Button>
      </form>
    </div>

  )
}
