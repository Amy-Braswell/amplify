import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

import { AccountContext } from '../Accounts/Accounts'
import { Loaded, Loading } from '../../Redux/actions/index'
import { LogIn } from './actions'

// TODO Display server side error in alert div

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    marginBottom: theme.spacing(18),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login(props) {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch()

  const { authenticate } = useContext(AccountContext)

  const login = (event) => {
    event.preventDefault()

    if (email.trim() === '') {
      setError('Email must not be empty')
      return
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        setError('Email must be a valid email address')
        return
      }
    }

    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (password.trim() === '') {
      setError('Password must not be empty')
      return
    } if (!password.match(passwordRegEx)) {
      setError('Password must contain 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character')
      return
    } else {
      setError('')
    }

    dispatch(Loading())

    authenticate(email, password)
      .then(() => {
        dispatch(LogIn())
        dispatch(Loaded())
        props.history.push('/')
      })
      .catch(err => {
        dispatch(Loaded())
        setError(`${err.message}`)
      })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form 
            className={classes.form}
            onSubmit={login}
            noValidate 
        >
          <Grid container spacing={2}>
            {error ?
                <Grid item xs={12}>
                  <Alert severity='error'>
                    {error}
                  </Alert>
                </Grid> 
                : 
                ''
            }
            <Grid item xs={12}>
              {loading &&
                <div className='Login_spinner'>
                  <CircularProgress />
                </div>
              }
              <TextField
                value={email}
                onChange={event => setEmail(event.target.value)}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={event => setPassword(event.target.value)}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify='space-between'>
            <Grid item>
              <Link to={'/register'} name='register' variant='body2'>
                Not a Member? Register
              </Link>
            </Grid>
            <Grid item>
            <Link to={'/forgot'} name='forgot' variant='body2'>
              Forgot Your Password? 
            </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  )
}