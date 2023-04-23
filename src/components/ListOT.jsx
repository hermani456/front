import * as React from "react";
import "./agregarOT.css";
import axios from "axios";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ListOT = ({ ordenes, onSet }) => {
  const getEntregados = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_MAGIC_SECRET}/entregados`
    );
    onSet(response.data);
  };
  const getListas = async () => {
    const response = await axios.get(`${process.env.REACT_APP_MAGIC_SECRET}/listas`);
    onSet(response.data);
  };
  const getAll = async () => {
    const response = await axios.get(`${process.env.REACT_APP_MAGIC_SECRET}`);
    onSet(response.data);
  };
  const getAdjudicacion = async () => {
    const response = await axios.get(`${process.env.REACT_APP_MAGIC_SECRET}/adjudicacion`);
    onSet(response.data);
  };

  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            style={{ textDecoration: "none" }}
            onClick={getListas}
            className="links"
          >
            Ordenes Listas
          </Link>
          <Link
            underline="hover"
            style={{ textDecoration: "none" }}
            onClick={getAll}
            className="links"
          >
            Ordenes en Proceso
          </Link>
          <Link
            underline="hover"
            style={{ textDecoration: "none" }}
            onClick={getEntregados}
            className="links"
          >
            Ordenes Entregadas
          </Link>
          <Link
            underline="hover"
            style={{ textDecoration: "none" }}
            onClick={getAdjudicacion}
            className="links"
          >
            Ajudicaciones
          </Link>
        </Breadcrumbs>
      </div>
      <TableContainer component={Paper} style={{ marginBottom: "40px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>OT</StyledTableCell>
              <StyledTableCell align="right">Referencia</StyledTableCell>
              <StyledTableCell align="right">Tipo Documento</StyledTableCell>
              <StyledTableCell align="right">Estado</StyledTableCell>
              <StyledTableCell align="right">Fecha Ingreso</StyledTableCell>
              <StyledTableCell align="right">Fecha Retiro</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map((orden) => (
              <StyledTableRow key={orden.ot}>
                <StyledTableCell component="th" scope="row">
                  {orden.ot}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  style={{ textTransform: "uppercase" }}
                >
                  {orden.referencia}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {orden.tipo_documento}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span className={`status ${orden.estado}`}>
                    {orden.estado}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {moment(orden.fecha_ingreso).utc().format("DD-MM-YY")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {moment(orden.fecha_entrega).utc().format("DD-MM-YY")}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListOT;
