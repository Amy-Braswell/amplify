import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'
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

import { Loaded, Loading } from '../../Redux/actions/index'
import { LogIn } from '../Login/actions'
import UserPool from '../UserPool'
import Pool from "../UserPool"

// TODO Display server side error in Alert Div

const useStyles1 = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
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
  }
}))

const useStyles2 = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(20),
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

export default function SignUp(props) {
  const classes1 = useStyles1()
  const classes2 = useStyles2()

  const [stage, setStage] = useState(1) // 1 = signUp stage, 2 = verification code stage
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch()

  const registerUser = event => {
    event.preventDefault()

    if (name.trim() === '') {
      setError('Name must not be empty')
      return
    }

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
    } if (password !== confirmPassword) {
      setError('Passwords must match')
      return 
    } else {
      setError('')
    }

    dispatch(Loading())

    var attributeList = [];     
    var dataName = {
        Name: 'name',
        Value: name,
    };
    var attributeName = new CognitoUserAttribute(
        dataName
    )
    attributeList.push(attributeName);
    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        setError(`${err.message}`)
        return
      } else {
        setSuccess('Your account was successfully created. Please check your email for your verification code.')
        dispatch(Loaded())
        setStage(2)
      }
    })
  }

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool
    })
  }

  const confirmRegisteredUser = event => {
    event.preventDefault()

    setError('')

    if (code.trim() === '') {
      setError('Verification code must not be empty')
      setSuccess('')
      return
    }

    dispatch(Loading())

    getUser().confirmRegistration(code, true, function(err, result) {
    if (err) {
        setError(`${err.message}`)
        return
      } 
    setError('')
    dispatch(LogIn())
    dispatch(Loaded())
    props.history.push('/')
    })
  }

  const resendCode = event => {
    getUser().resendConfirmationCode(function(err, result) {
      if (err) {
          setError(`${err.message}`)
          return
      }
      if (result) {
      setSuccess('new code sent')
      setError('')
      return
      }
    })
  }
  
  return (
    <Container component='main' maxWidth='xs' className='form_sign-up'>
      <CssBaseline />

      {stage === 1 && (
        <div className={classes1.paper}>
        
          <Avatar className={classes1.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>

          <form 
              className={classes1.form}
              onSubmit={registerUser}
              noValidate 
          >
            <Grid container spacing={1}>
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
                  <div className='SignUp1_spinner'>
                    <CircularProgress />
                  </div>
                }
                <TextField
                  value={name}
                  onChange={event => setName(event.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  name='name'
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                />
              </Grid> 
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes1.submit}
            >
              Register
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to={'/login'} name='login' variant='body2'>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>

        </div>
      )}

      {stage === 2 && (
        <div className={classes2.paper}>
        
          <Avatar className={classes2.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Check Your Email
          </Typography>
          <form 
            className={classes2.form}
            onSubmit={confirmRegisteredUser}
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
              {success ?
                <Grid item xs={12}>
                  <Alert severity='success'>
                    {success}
                  </Alert>
                </Grid> 
                : 
                ''
              }
              <Grid item xs={12}>
                {loading &&
                  <div className='SignUp2_spinner'>
                    <CircularProgress />
                  </div>
                }
                <TextField
                  value={code}
                  onChange={event => setCode(event.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  id='code'
                  label='Verification Code'
                  name='code'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes2.submit}
            >
              Submit Code
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link onClick={resendCode} name='resend' variant='body2'>
                  Resend Code
                </Link>
              </Grid>
            </Grid> 
          </form>
        </div>
      )}

    </Container>
  )
}
