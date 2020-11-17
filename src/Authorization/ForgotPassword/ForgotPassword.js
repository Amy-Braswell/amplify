import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CognitoUser } from "amazon-cognito-identity-js"
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
import CircularProgress from '@material-ui/core/CircularProgress';

import Pool from '../UserPool'
import { Loaded, Loading } from '../../Redux/actions/index'

//TODO Display server side error in alert div

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(25),
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

export default function ForgotPassword(props) {
  const classes = useStyles()

  const [stage, setStage] = useState(1) // 1 = email stage, 2 = verification code stage
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch()

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool
    })
  };

  const sendCode = event => {
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
    dispatch(Loading())

    getUser().forgotPassword({
      onSuccess: data => {
        setError('')
      },
      onFailure: err => {
        setError(`${err.message}`)
      },
      inputVerificationCode: data => {
        setError('')
        setSuccess('Please check your email for your verification code.')
        dispatch(Loaded())
        setStage(2)
      }
    });
  };

  const resendCode = event => {
    getUser().resendConfirmationCode(function(err, result) {
      if (err) {
        setError(`${err.message}`)
        return
      }
      if (result) {
        setSuccess('new code sent')
        return
      }
    })
  }

  const resetPassword = event => {
    event.preventDefault()

    setSuccess('')

    if (code.trim() === '') {
      setError('Verification code must not be empty')
      return
    }

    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (password === '') {
      setError('Password must not empty')
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

    getUser().confirmPassword(code, password, {
      onSuccess: data => {
        setError('')
        dispatch(Loaded())
        props.history.push('/login')
      },
      onFailure: err => {
        setError(`${err.message}`)
      }
    })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
        
        {stage === 1 && (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Forgot Password
            </Typography>
            <form 
                className={classes.form}
                onSubmit={sendCode}
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
                    <div className='Forgot1_spinner'>
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
                    label='Enter Email Address'
                    name='email'
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
                Send verification code
              </Button> 
            </form>
          </div>
        )}

        {stage === 2 && (
          <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Check Your Email
          </Typography>
            <form 
                className={classes.form}
                onSubmit={resetPassword}
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
                  <div className='Forgot2_spinner'>
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
                    label='Validation Code'
                    name='code'
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
                    label='New Password'
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
                    label='Confirm New Password'
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
                className={classes.submit}
              >
                Change Password
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