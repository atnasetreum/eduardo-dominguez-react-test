import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import esLocale from "date-fns/locale/es";
import { FormEmploye } from ".";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
  closeForm: () => void;
  form: FormEmploye;
  setForm: (form: FormEmploye) => void;
  createEmploye: () => void;
}

const FormEmployees = ({ closeForm, form, setForm, createEmploye }: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <TextField
            name="name"
            label="Nombre"
            variant="outlined"
            fullWidth
            autoComplete="off"
            inputProps={{ maxLength: 30 }}
            value={form.name}
            onChange={({ target: { value, name } }) =>
              setForm({ ...form, [name]: value })
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <TextField
            name="lastName"
            label="Apellidos"
            variant="outlined"
            fullWidth
            autoComplete="off"
            inputProps={{ maxLength: 30 }}
            value={form.lastName}
            onChange={({ target: { value, name } }) =>
              setForm({ ...form, [name]: value })
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <DatePicker
              label="Fecha de nacimiento"
              inputFormat="dd/MM/yyyy"
              value={form.birthday}
              onChange={(value) => setForm({ ...form, birthday: value })}
              renderInput={(params: TextFieldProps) => (
                <TextField {...params} fullWidth autoComplete="off" />
              )}
            />
          </LocalizationProvider>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth
          sx={{ mt: 1 }}
        >
          <Button color="error" startIcon={<ClearIcon />} onClick={closeForm}>
            Cancelar
          </Button>
          <Button startIcon={<SaveIcon />} onClick={createEmploye}>
            Crear
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default FormEmployees;
