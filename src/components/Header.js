import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"

const Header = () => {
	return (
		<>
			<div>
				<nav className='navbar navbar-dark bg-dark'>
					<div className='container-fluid'>
						<span className='navbar-brand mb-0 h1'>DC</span>
					<ul className='lonk'>
						<li><Link to='agregar'>Agregar</Link></li>
					</ul>
					</div>
				</nav>
				{/* <h1 className='text-center mt-5 mb-3'>Orden de trabajo</h1> */}
			</div>
		</>
	)
}

export default Header
