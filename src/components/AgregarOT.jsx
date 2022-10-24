import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./agregarOT.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import ListOT from "./ListOT";

export default function AgregarOT() {
  const [ordenes, setordenes] = useState([]);
  const [ot, setOt] = useState("");
  const [otIsValid, setOtIsValid] = useState(true);
  const [rut, setRut] = useState(17797462);
  const [referencia, setreferencia] = useState("");
  const [tipo_documento, setTipoDocumento] = useState("GP");
  const [fecha_ingreso, setFechaIngreso] = useState("");
  const [fecha_entrega, setFechaEntrega] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(true);

  const obtenerOT = async () => {
    const respuesta = await axios.get(process.env.REACT_APP_MAGIC_SECRET);
    setordenes(respuesta.data);
    setLoading(false);
  };

  useEffect(() => {
    obtenerOT();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ot.trim() === "") {
      setOtIsValid(false);
      return;
    }
    const estado = "Esperando estado";
    const fecha_ingreso = moment().format("YYYY-MM-DD");
    const nuevaOrden = {
      ot,
      rut,
      referencia,
      tipo_documento,
      fecha_ingreso,
      fecha_entrega,
      estado,
      observaciones,
    };
    await axios.post(process.env.REACT_APP_MAGIC_SECRET, nuevaOrden);
    setordenes([nuevaOrden, ...ordenes]);
    setOt("");
    setRut(17797462);
    setreferencia("");
    setTipoDocumento("GP");
    setFechaIngreso("");
    setFechaEntrega("");
    setObservaciones("");
  };

  const options = [
    "GP",
    "D.F.R.",
    "ESCRITURA",
    "ADJUDICACION",
    "COMPRAVENTA",
    "HIP/PROH",
    "ALZAMIENTO",
    "HERENCIA",
    "VIGENCIA",
    "OTRO",
  ];

  if (loading) {
    return <div>LOADING</div>;
  }
  return (
    <>
      <h4 className="text-center mt-3">AGREGAR OT</h4>
      <Box
        marginTop={4}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="field">
          <TextField
            label="Numero de OT"
            type="number"
            value={ot}
            onChange={(e) => {
              setOt(e.target.value);
              setOtIsValid(e.target.value);
            }}
            error={!otIsValid}
            helperText={!otIsValid && "campo obligatorio"}
          />
          <TextField
            label="Rut"
            type="number"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
          <TextField
            label="Referencia"
            type="text"
            value={referencia}
            onChange={(e) => setreferencia(e.target.value)}
          />
          <TextField
            label="Tipo de Documento"
            select
            type="text"
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
            label="Fecha Retiro"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={fecha_entrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
          />
          <TextField
            label="Observaciones"
            type="text"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="text-center d-block mx-auto"
        >
          Agregar
        </Button>
      </Box>
      <ListOT ordenes={ordenes} onSet={setordenes} onGetAll={obtenerOT}/>
    </>
  );
}
