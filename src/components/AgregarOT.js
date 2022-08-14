// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import moment from 'moment'

// const AgregarOT = () => {
// 	const [ordenes, setordenes] = useState([])
// 	const [ot, setOt] = useState('')
// 	const [referencia, setreferencia] = useState('')
// 	const [tipo_documento, setTipoDocumento] = useState('')
// 	const [fecha_ingreso, setFechaIngreso] = useState('')
// 	const [fecha_entrega, setFechaEntrega] = useState('')
// 	const [observaciones, setObservaciones] = useState('')

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		const estado = 'En proceso'
// 		const nuevaOrden = { ot, referencia, tipo_documento, fecha_ingreso, fecha_entrega, estado, observaciones }
// 		await axios.post(process.env.REACT_APP_MAGIC_SECRET, nuevaOrden)
// 		setordenes([...ordenes, nuevaOrden])
// 		setOt('')
// 		setreferencia('')
// 		setTipoDocumento('')
// 		setFechaIngreso('')
// 		setFechaEntrega('')
// 		setObservaciones('')
// 	}

// 	return (
// 		<>
// 		<div className='mt-5'>
// 			<form className='container' onSubmit={handleSubmit}>
// 				<div className='row'>
// 					<div className='col'>
// 						<input
// 							type='number'
// 							className='form-control'
// 							placeholder='OT'
// 							value={ot}
// 							onChange={(e) => setOt(parseInt(e.target.value))}
// 						/>
// 					</div>
// 					<div className='col'>
// 						<input
// 							type='text'
// 							className='form-control'
// 							placeholder='referencia'
// 							value={referencia}
// 							onChange={(e) => setreferencia(e.target.value)}
// 						/>
// 					</div>
// 					<div className='col'>
// 						<input
// 							type='text'
// 							className='form-control'
// 							placeholder='Tipo documento'
// 							value={tipo_documento}
// 							onChange={(e) => setTipoDocumento(e.target.value)}
// 						/>
// 					</div>
// 					<div className='col'>
// 						<input
// 							type='date'
// 							className='form-control'
// 							placeholder='Fecha Ingreso'
// 							value={fecha_ingreso}
// 							onChange={(e) => setFechaIngreso(e.target.value)}
// 						/>
// 					</div>
// 					<div className='col'>
// 						<input
// 							type='date'
// 							className='form-control'
// 							placeholder='Fecha Salida'
// 							value={fecha_entrega}
// 							onChange={(e) => setFechaEntrega(e.target.value)}
// 						/>
// 					</div>
// 					{/* <div className='col'>
// 						<input
// 							type='text'
// 							className='form-control'
// 							placeholder='Estado'
// 							value={estado}
// 							onChange={(e) => setEstado(e.target.value)}
// 						/>
// 					</div> */}
// 					<div className='col'>
// 						<input
// 							type='text'
// 							className='form-control'
// 							placeholder='Observaciones'
// 							value={observaciones}
// 							onChange={(e) => setObservaciones(e.target.value)}
// 						/>
// 					</div>
// 				</div>
// 				<div className='text-center mt-3'>
// 					<button className='btn btn-success'>Agregar OT</button>
// 				</div>
// 			</form>
// 		</div>
// 		<div>
// 			<h1 className='text-center my-3'>Ordenes de trabajo</h1>
// 			<table className='table text-white'>
// 				<thead>
// 					<tr>
// 						<th scope='col'>OT</th>
// 						<th scope='col'>Referencia</th>
// 						<th scope='col'>Tipo de Documento</th>
// 						<th scope='col'>Fecha Ingreso</th>
// 						<th scope='col'>Fecha Entrega</th>
// 						<th scope='col'>Estado</th>
// 						<th scope='col'>Observaciones</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{/* <tr>
// 						<th scope='row'>1</th>
// 						<td>Mark</td>
// 						<td>Otto</td>
// 						<td>@mdo</td>
// 					</tr> */}
// 					{ordenes.map((orden) => {
// 						return (
// 							<tr key={orden.ot}>
// 								<th scope='row'>{orden.ot}</th>
// 								<td>{orden.referencia}</td>
// 								<td>{orden.tipo_documento}</td>
// 								<td>{moment(orden.fecha_ingreso).utc().format('DD-MM-YY')}</td>
// 								<td>{moment(orden.fecha_entrega).utc().format('DD-MM-YY')}</td>
// 								<td>{orden.estado}</td>
// 								<td>{orden.observaciones}</td>
// 								{/* <td>
// 									<EditarOT orden={orden} setOrden={setordenes} />
// 								</td> */}
// 								{/* <td>
// 									<FaTrashAlt
// 										className='text-danger'
// 										type='button'
// 										onClick={() => eliminarorden(orden.ot)}
// 									>
// 										Borrar
// 									</FaTrashAlt>
// 								</td> */}
// 							</tr>
// 						)
// 					})}
// 				</tbody>
// 			</table>
// 		</div>
// 		</>

// 	)
// }

// export default AgregarOT

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import './agregarOT.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment'

const columns = [
	{ field: 'ot', headerName: 'OT', width: 90 },
	// { field: 'rut', headerName: 'RUT', width: 90 },
	{ field: 'referencia', headerName: 'Referencia', width: 180 },
	{ field: 'tipo_documento', headerName: 'Documento', width: 130 },
	{
		field: 'fecha_ingreso',
		headerName: 'Fecha Ingreso',
		type: 'date',
		width: 120,
	},
	{
		field: 'fecha_entrega',
		headerName: 'Fecha Retiro',
		type: 'date',
		width: 120,
	},
	{
		field: 'estado',
		headerName: 'Estado',
		width: 180,
	},
	{
		field: 'oberservaciones',
		headerName: 'Oberservaciones',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 200,
	},
]

export default function AgregarOT() {
	const [ordenes, setordenes] = useState([])
	const [ot, setOt] = useState('')
	const [rut, setRut] = useState(17797462)
	const [referencia, setreferencia] = useState('')
	const [tipo_documento, setTipoDocumento] = useState('GP')
	const [fecha_ingreso, setFechaIngreso] = useState('')
	const [fecha_entrega, setFechaEntrega] = useState('')
	const [observaciones, setObservaciones] = useState('')

	const obtenerOT = async () => {
		const respuesta = await axios.get(process.env.REACT_APP_MAGIC_SECRET)
		setordenes(respuesta.data)
	}

	useEffect(() => {
		obtenerOT()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const estado = 'En proceso'
		const nuevaOrden = {
			ot,
			rut,
			referencia,
			tipo_documento,
			fecha_ingreso,
			fecha_entrega,
			estado,
			observaciones,
		}
		await axios.post(process.env.REACT_APP_MAGIC_SECRET, nuevaOrden)
		setordenes([...ordenes, nuevaOrden])
		setOt('')
		setRut('')
		setreferencia('')
		setTipoDocumento('')
		setFechaIngreso('')
		setFechaEntrega('')
		setObservaciones('')
	}

	const options = ['GP', 'D.F.R.', 'ESCRITURA', 'OTRO']

	return (
		<>
			<h2 className='text-center mt-3'>Agregar Nueva OT</h2>
			<Box
				marginTop={4}
				component='form'
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
			>
				<div className='field'>
					<TextField
						label='Numero de OT'
						type='number'
						value={ot}
						onChange={(e) => setOt(e.target.value)}
					/>
					<TextField
						label='Rut'
						type='number'
						value={rut}
						onChange={(e) => setRut(e.target.value)}
					/>
					<TextField
						label='Referencia'
						type='text'
						value={referencia}
						onChange={(e) => setreferencia(e.target.value)}
					/>
					<TextField
						label='Tipo de Documento'
						select
						type='text'
						value={tipo_documento}
						onChange={(e) => setTipoDocumento(e.target.value)}
					>
					{options.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
					</TextField>
					<TextField
						label='Fecha Ingreso'
						type='date'
						InputLabelProps={{
							shrink: true,
						}}
						value={fecha_ingreso}
						onChange={(e) => setFechaIngreso(e.target.value)}
					/>
					<TextField
						label='Fecha Retiro'
						type='date'
						InputLabelProps={{
							shrink: true,
						}}
						value={fecha_entrega}
						onChange={(e) => setFechaEntrega(e.target.value)}
					/>
					<TextField
						label='Observaciones'
						type='text'
						value={observaciones}
						onChange={(e) => setObservaciones(e.target.value)}
					/>
				</div>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					onClick={handleSubmit}
					className='text-center d-block mx-auto'
				>
					Agregar OT
				</Button>
			</Box>
			<h2 className='text-center my-3'>Listado de OTs</h2>
			<div style={{ height: 500, width: '100%', marginTop: 20, marginBottom: 30 }}>
				<DataGrid
					className='field'
					rows={ordenes}
					getRowId={(row) => row.ot}
					columns={columns}
					pageSize={7}
					rowsPerPageOptions={[5]}
					checkboxSelection={false}
				/>
			</div>
		</>
	)
}
