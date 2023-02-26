import Header from "./components/Header";
import AgregarOT from "./components/AgregarOT";
import { Container } from "react-bootstrap";
import Aho from "./components/Aho";
// import Footer from './components/Footer'
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <>
      {/* <ThemeProvider theme={darkTheme}>
        <AgregarOT />
      </ThemeProvider> */}
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          {currentUser && <Header />}
          <Container>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <AgregarOT />
                  </RequireAuth>
                }
              />
              <Route
                path="agregar"
                element={
                  <RequireAuth>
                    <Aho />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
