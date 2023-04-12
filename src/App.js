import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import Main from './components/Main/Main';
import { app } from './firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';


function App() {

  const [userEmail, setUserEmail] = useState('')


  // redirect to home if user is already logged in.
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])

  const navigate = useNavigate();
  async function handleGoogleSignIn(){
    
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('result: ', result)
        setUserEmail(result.user.email)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        navigate('/home')

      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  function handleRegister(data){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        console.log(userCredential)
        setUserEmail(userCredential.user.email)
        const user = userCredential.user
        sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken)
        navigate('/home')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  function handleLogIn(data){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        console.log('user credential', userCredential)
        setUserEmail(userCredential.user.email)
        const user = userCredential.user
        sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken)
        navigate('/home')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  function handleSignOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      sessionStorage.removeItem('Auth Token')
      navigate('/')
      console.log(auth)
    }).catch((error) => {

    })
  }

  console.log(getAuth())


  return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<LogIn googleSignInCallback={handleGoogleSignIn} signOutCallback={handleSignOut} logInCallback={handleLogIn} />} />
          <Route path='register' element={<Register registerCallback={handleRegister} />} />
          <Route path='/home' element={<Main signOut={handleSignOut} name={userEmail} />} />
        </Routes>
      <Footer />
      </div>


)}

export default App;
