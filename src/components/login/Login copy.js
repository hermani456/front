import './login.css'
import { useContext, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [error, setError] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const { dispatch } = useContext(AuthContext)

	const handleSubmit = (e) => {
		e.preventDefault()
		const auth = getAuth()
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				dispatch({ type: 'LOGIN', payload: user })
				navigate('/')
				setError(false)
				// ...
			})
			.catch((error) => {
				console.log(error)
				setError(true)
			})
	}
	return (
		<div className='login'>
			<h1 className='mt-5'>Login</h1>
			<form className='form' onSubmit={handleSubmit}>
				<input
					className='input'
					type='mail'
					placeholder='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className='input'
					type='password'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='button' type='submit'>Login</button>
				{error && <span>User not found</span>}
			</form>
		</div>
	)
}

export default Login