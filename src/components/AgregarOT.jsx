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
import Loading from "./Loading";

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
    return <Loading />;
  }

  return (
      <ListOT ordenes={ordenes} onSet={setordenes} onGetAll={obtenerOT} />
  );
}
