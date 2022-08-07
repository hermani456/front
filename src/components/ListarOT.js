import { useState, useEffect } from 'react'
import axios from 'axios'
import EditarOT from './EditarOT'
import { FaTrashAlt } from 'react-icons/fa'
import moment from 'moment'
import AgregarOT from './AgregarOT'

const ListarOT = () => {
	const [ordenes, setordenes] = useState([])

	const obtenerOT = async () => {
		const respuesta = await axios.get(process.env.REACT_APP_MAGIC_SECRET)
		setordenes(respuesta.data)
	}

	useEffect(() => {
		obtenerOT()
	}, [])

	const eliminarorden = async (ot) => {
		await axios.delete(process.env.REACT_APP_MAGIC_SECRET, { data: { ot } })
		setordenes(ordenes.filter((orden) => orden.ot !== ot))
	}
	<AgregarOT orden={ordenes} setOrden={setordenes}/>

	return (
		<div>
			<h1 className='text-center my-3'>Ordenes de trabajo</h1>
			<table className='table text-white'>
				<thead>
					<tr>
						<th scope='col'>OT</th>
						<th scope='col'>Referencia</th>
						<th scope='col'>Tipo de Documento</th>
						<th scope='col'>Fecha Ingreso</th>
						<th scope='col'>Fecha Entrega</th>
						<th scope='col'>Estado</th>
						<th scope='col'>Observaciones</th>
					</tr>
				</thead>
				<tbody>
					{/* <tr>
						<th scope='row'>1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr> */}
					{ordenes.map((orden) => {
						return (
							<tr key={orden.ot}>
								<th scope='row'>{orden.ot}</th>
								<td>{orden.referencia}</td>
								<td>{orden.tipo_documento}</td>
								<td>{moment(orden.fecha_ingreso).utc().format('DD-MM-YY')}</td>
								<td>{moment(orden.fecha_entrega).utc().format('DD-MM-YY')}</td>
								<td>{orden.estado}</td>
								<td>{orden.observaciones}</td>
								<td>
									<EditarOT orden={orden} setOrden={setordenes} />
								</td>
								<td>
									<FaTrashAlt
										className='text-danger'
										type='button'
										onClick={() => eliminarorden(orden.ot)}
									>
										Borrar
									</FaTrashAlt>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default ListarOT
