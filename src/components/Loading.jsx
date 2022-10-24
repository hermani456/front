import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box className="loading">
      <CircularProgress />
      <Typography variant="h6">Loading</Typography>
    </Box>
  );
}
