import axios from 'axios'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

const EditarOT = ({ orden, setOrden }) => {
	const [ot, setOt] = useState(orden.ot)
	const [fecha_entrega, setFechaEntrega] = useState(orden.fecha_entrega)
	const [estado, setEstado] = useState(orden.estado)
	const [observaciones, setObservaciones] = useState(orden.observaciones)

	const updateorden = async (e) => {
		e.preventDefault()
		try {
			const body = { ot, fecha_entrega, estado, observaciones }
			await axios.put(
				process.env.REACT_APP_MAGIC_SECRET, body)

			window.location = '/'
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<>
			<FaEdit
				type='button'
				className='text-warning'
				data-bs-toggle='modal'
				data-bs-target={`#id${orden.ot}`}
			>
				Editar
			</FaEdit>

			<div
				className='modal fade'
				id={`id${orden.ot}`}
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content bg-dark'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Editar OT
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<form className='container'>
								<div className='row'>
									<div className='col'>
										<input
											type='date'
											className='form-control'
											placeholder='Fecha entrega'
											value={fecha_entrega}
											onChange={(e) => setFechaEntrega(e.target.value)}
										/>
									</div>
									<div className='col'>
										<input
											type='text'
											className='form-control'
											placeholder='Estado'
											value={estado}
											onChange={(e) => setEstado(e.target.value)}
										/>
									</div>
									<div className='col'>
										<input
											type='text'
											className='form-control'
											placeholder='Observaciones'
											value={observaciones}
											onChange={(e) => setObservaciones(e.target.value)}
										/>
									</div>
								</div>
							</form>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-warning'
								onClick={(e) => updateorden(e)}
							>
								Editar
							</button>
							<button
								type='button'
								className='btn btn-primary'
								data-bs-dismiss='modal'
							>
								Cerrar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default EditarOT
