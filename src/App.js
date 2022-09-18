import AgregarOT from './components/AgregarOT'
import { Container } from 'react-bootstrap'
import ListarOT from './components/ListarOT'
// import Footer from './components/Footer'
import Login from './components/login/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'

function App() {
	const { currentUser } = useContext(AuthContext)

	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to='/login' />
	}

	return (
		<>
			<BrowserRouter>
				<Container>
					<Routes>
						<Route path='login' element={<Login />} />
						<Route
							path='/'
							element={
								<RequireAuth>
									<AgregarOT />
								</RequireAuth>
							}
						/>
						<Route
							path='agregar'
							element={
								<RequireAuth>
									<ListarOT />
								</RequireAuth>
							}
						/>
						<Route path='*' element={<div>Not found</div>} />
					</Routes>
				</Container>
			</BrowserRouter>
		</>
	)
}

export default App
