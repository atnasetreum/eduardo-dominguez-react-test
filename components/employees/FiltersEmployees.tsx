import { Grid, Paper, TextField, TextFieldProps } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import esLocale from "date-fns/locale/es";
import { FiltersEmploye } from ".";

interface Props {
  filters: FiltersEmploye;
  setFilters: (filters: FiltersEmploye) => void;
}

const FiltersEmployees = ({ filters, setFilters }: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <TextField
            type="number"
            name="id"
            label="ID"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={filters.id}
            onChange={({ target: { value, name } }) =>
              setFilters({ ...filters, [name]: value })
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <TextField
            name="name"
            label="Nombre"
            variant="outlined"
            fullWidth
            autoComplete="off"
            inputProps={{ maxLength: 30 }}
            value={filters.name}
            onChange={({ target: { value, name } }) =>
              setFilters({ ...filters, [name]: value })
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
            value={filters.lastName}
            onChange={({ target: { value, name } }) =>
              setFilters({ ...filters, [name]: value })
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <DatePicker
              label="Fecha"
              inputFormat="dd/MM/yyyy"
              value={filters.birthday}
              onChange={(value) => setFilters({ ...filters, birthday: value })}
              renderInput={(params: TextFieldProps) => (
                <TextField {...params} fullWidth autoComplete="off" />
              )}
            />
          </LocalizationProvider>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FiltersEmployees;
