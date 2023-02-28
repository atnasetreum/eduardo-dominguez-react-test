import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNotify } from "hooks";
import { useEffect, useState } from "react";
import { EmployeesApi } from "utils/api";
import {
  formatDataBase,
  formatDateComparation,
  isValidDate,
} from "utils/dates";
import { Employee } from "../../ts/interfaces";
import FiltersEmployees from "./FiltersEmployees";
import FormEmployees from "./FormEmployees";
import TableEmployees from "./TableEmployees";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export interface FiltersEmploye {
  id: string;
  name: string;
  lastName: string;
  birthday: Date | null;
}

const filterInit: FiltersEmploye = {
  id: "",
  name: "",
  lastName: "",
  birthday: null,
};

export interface FormEmploye {
  name: string;
  lastName: string;
  birthday: Date | null;
}

const formInit: FormEmploye = {
  name: "",
  lastName: "",
  birthday: null,
};

export default function EmployeesPage() {
  const { notify } = useNotify();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [filters, setFilters] = useState<FiltersEmploye>(filterInit);
  const [form, setForm] = useState<FormEmploye>(formInit);
  const [action, setAction] = useState<string>("");

  const getEmployees = () => {
    EmployeesApi.getAll()
      .then(({ data }) => {
        setEmployees(data.employees);
        setEmployeesData(data.employees);
      })
      .catch((err) => notify(err.message));
  };
  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    const id = Number(filters.id.trim());
    const name = filters.name.trim().toUpperCase();
    const lastName = filters.lastName.trim().toUpperCase();
    const birthday = filters.birthday;

    let employeesArray = employeesData;
    if (id > 0) {
      employeesArray = employeesData.filter((employe) => employe.id === id);
    }

    if (name) {
      employeesArray = employeesData.filter((employe) =>
        employe.name.toUpperCase().includes(name)
      );
    }

    if (lastName) {
      employeesArray = employeesData.filter((employe) =>
        employe.last_name.toUpperCase().includes(lastName)
      );
    }

    if (birthday && isValidDate(birthday)) {
      employeesArray = employeesData.filter(
        (employe) =>
          formatDateComparation(employe.birthday) ===
          formatDateComparation(birthday)
      );
    }

    setEmployees(employeesArray);
  }, [filters, employeesData]);

  const closeForm = () => {
    setAction("");
    setForm(formInit);
  };

  const createEmploye = () => {
    const name = form.name.trim();
    const last_name = form.lastName.trim();
    const birthday = form.birthday;

    if (!name) {
      return notify("Agregue un nombre");
    }

    if (!last_name) {
      return notify("Agregue el apellido completo");
    }

    if (!birthday) {
      return notify("Agregue la fecha de nacimiento");
    }

    if (!isValidDate(birthday)) {
      return notify("Fecha de nacimiento invalida");
    }

    EmployeesApi.create({
      name,
      last_name,
      birthday: formatDataBase(birthday),
    })
      .then(() => {
        getEmployees();
        closeForm();
      })
      .catch((err) => notify(err.message));
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={1}>
        {action === "add" && (
          <Grid item xs={12} md={12} lg={12}>
            <FormEmployees
              closeForm={closeForm}
              form={form}
              setForm={setForm}
              createEmploye={createEmploye}
            />
          </Grid>
        )}
        {action === "" && (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <Button
                startIcon={<PersonAddIcon />}
                variant="contained"
                onClick={() => setAction("add")}
              >
                Agregar
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FiltersEmployees filters={filters} setFilters={setFilters} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableEmployees rows={employees} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
