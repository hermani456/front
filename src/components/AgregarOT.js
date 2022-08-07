import { useState, useEffect } from 'react'
import axios from 'axios'

const AgregarOT = () => {
	const [ot, setOt] = useState('')
	const [referencia, setreferencia] = useState('')
	const [tipo_documento, setTipoDocumento] = useState('')
	const [fecha_ingreso, setFechaIngreso] = useState('')
	const [fecha_entrega, setFechaEntrega] = useState('')
	const [observaciones, setObservaciones] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		const estado = 'En proceso'
		const nuevaOrden = { ot, referencia, tipo_documento, fecha_ingreso, fecha_entrega, estado, observaciones }
		await axios.post(process.env.REACT_APP_MAGIC_SECRET, nuevaOrden)
		window.location = '/'
	}
	
	return (
		<div className='mt-5'>
			<form className='container' onSubmit={handleSubmit}>
				<div className='row'>
					<div className='col'>
						<input
							type='number'
							className='form-control'
							placeholder='OT'
							value={ot}
							onChange={(e) => setOt(parseInt(e.target.value))}
						/>
					</div>
					<div className='col'>
						<input
							type='text'
							className='form-control'
							placeholder='referencia'
							value={referencia}
							onChange={(e) => setreferencia(e.target.value)}
						/>
					</div>
					<div className='col'>
						<input
							type='text'
							className='form-control'
							placeholder='Tipo documento'
							value={tipo_documento}
							onChange={(e) => setTipoDocumento(e.target.value)}
						/>
					</div>
					<div className='col'>
						<input
							type='date'
							className='form-control'
							placeholder='Fecha Ingreso'
							value={fecha_ingreso}
							onChange={(e) => setFechaIngreso(e.target.value)}
						/>
					</div>
					<div className='col'>
						<input
							type='date'
							className='form-control'
							placeholder='Fecha Salida'
							value={fecha_entrega}
							onChange={(e) => setFechaEntrega(e.target.value)}
						/>
					</div>
					{/* <div className='col'>
						<input
							type='text'
							className='form-control'
							placeholder='Estado'
							value={estado}
							onChange={(e) => setEstado(e.target.value)}
						/>
					</div> */}
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
				<div className='text-center mt-3'>
					<button className='btn btn-success'>Agregar OT</button>
				</div>
			</form>
		</div>
	)
}

export default AgregarOT
