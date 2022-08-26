import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './agregarOT.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem'
import moment from 'moment'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

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

	const handleFilterListo = (e) => {
		setordenes(ordenes.filter((orden) => orden.estado === 'LISTO'))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const estado = 'En espera'
		const fecha_ingreso = moment().format('YYYY-MM-DD')
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
		console.log(nuevaOrden)
		await axios.post(process.env.REACT_APP_MAGIC_SECRET, nuevaOrden)
		setordenes([...ordenes, nuevaOrden])
		setOt('')
		setRut(17797462)
		setreferencia('')
		setTipoDocumento('GP')
		setFechaIngreso('')
		setFechaEntrega('')
		setObservaciones('')
	}

	const options = ['GP', 'D.F.R.', 'ESCRITURA', 'ADJUDICACION', 'COMPRAVENTA', 'PROHIBICION', 'HERENCIA', 'VIGENCIA', 'OTRO']

	return (
		<>
			<h2 className='text-center mt-3'>AGREGAR OT</h2>
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
					{/* <TextField
						label='Fecha Ingreso'
						type='date'
						InputLabelProps={{
							shrink: true,
						}}
						value={fecha_ingreso}
						onChange={(e) => setFechaIngreso(e.target.value)}
					/> */}
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
					Agregar
				</Button>
			</Box>
			<div role='presentation'>
				<Breadcrumbs aria-label='breadcrumb'>
					<Link
						underline='hover'
						style={{ textDecoration: 'none' }}
						onClick={handleFilterListo}
						className='links'
					>
						Ordenes Listas
					</Link>
					<Link
						underline='hover'
						style={{ textDecoration: 'none' }}
						onClick={obtenerOT}
						className='links'
					>
						Todas las Ordenes
					</Link>
				</Breadcrumbs>
			</div>
			<TableContainer component={Paper} style={{ marginBottom: '40px' }}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell>OT</StyledTableCell>
							<StyledTableCell align='right'>Referencia</StyledTableCell>
							<StyledTableCell align='right'>Tipo Documento</StyledTableCell>
							<StyledTableCell align='right'>Estado</StyledTableCell>
							<StyledTableCell align='right'>Fecha Ingreso</StyledTableCell>
							<StyledTableCell align='right'>Fecha Retiro</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ordenes.map((orden) => (
							<StyledTableRow key={orden.ot}>
								<StyledTableCell component='th' scope='row'>
									{orden.ot}
								</StyledTableCell>
								<StyledTableCell align='right' style={{textTransform: "uppercase"}}>
									{orden.referencia}
								</StyledTableCell>
								<StyledTableCell align='right'>
									{orden.tipo_documento}
								</StyledTableCell>
								<StyledTableCell align='right'>
									<span className={`status ${orden.estado}`}>
										{orden.estado}
									</span>
								</StyledTableCell>
								<StyledTableCell align='right'>
									{moment(orden.fecha_ingreso).utc().format('DD-MM-YY')}
								</StyledTableCell>
								<StyledTableCell align='right'>
									{moment(orden.fecha_entrega).utc().format('DD-MM-YY')}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
