import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import Copyright from "components/ui/CopyrightUpax";
import { useNotify } from "hooks";
import {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  useContext,
  useState,
} from "react";
import { AuthContext } from "contexts/auth";

const theme = createTheme();

interface FormLogin {
  username: string;
  password: string;
}

const formInit: FormLogin = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const [form, setForm] = useState<FormLogin>(formInit);
  const router = useRouter();
  const { notify } = useNotify();
  const { loginUser } = useContext(AuthContext);

  const validateForm = async () => {
    const username = form.username.trim();
    const password = form.password.trim();

    if (!username) {
      notify("Agregue un usuario");
      return false;
    }

    if (!password) {
      notify("Agregue una contraseña");
      return false;
    }

    return {
      username,
      password,
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = await validateForm();

    if (formData) {
      const { isLoggedIn } = await loginUser(
        formData.username,
        formData.password
      );

      if (!isLoggedIn) {
        return notify("Credenciales no validas");
      }

      router.push({
        pathname: "/upax",
        hash: "employees",
      });
    }
  };

  const disableCopyAndPasteInput = (
    event: ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    return false;
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            UPAX test
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              name="username"
              margin="normal"
              required
              fullWidth
              label="Usuario"
              autoComplete="off"
              autoFocus
              onPaste={disableCopyAndPasteInput}
              onCopy={disableCopyAndPasteInput}
              value={form.username}
              onChange={handleChangeInput}
            />
            <TextField
              name="password"
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              onPaste={disableCopyAndPasteInput}
              onCopy={disableCopyAndPasteInput}
              value={form.password}
              onChange={handleChangeInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar session
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
