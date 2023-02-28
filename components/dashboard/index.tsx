import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNotify } from "hooks";
import { useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { setImages, setUsers } from "store/slices";
import { EmployeesApi, ImagesApi } from "utils/api";
import ImageChart from "./ImageChart";
import UserChart from "./UserChart";

export default function DashboardPage() {
  const dispatchRedux = useAppDispatch();
  const { notify } = useNotify();

  const getEmployees = () => {
    EmployeesApi.getAll()
      .then(({ data }) => {
        dispatchRedux(setUsers(data.employees));
      })
      .catch((err) => notify(err.message));
  };

  const getImages = async () => {
    ImagesApi.getAll()
      .then((data) => {
        dispatchRedux(setImages(data));
      })
      .catch((err) => notify(err.message));
  };

  useEffect(() => {
    getEmployees();
    getImages();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6} lg={6}>
          <UserChart />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <ImageChart />
        </Grid>
      </Grid>
    </Container>
  );
}
