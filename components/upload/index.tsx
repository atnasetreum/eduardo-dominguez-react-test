import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormUpload from "./FormUpload";
import SaveIcon from "@mui/icons-material/Save";
import { useState, useEffect } from "react";
import { ImagesApi } from "utils/api";
import { useNotify } from "hooks";
import TableImages from "./TableImages";

export default function UploadPage() {
  const { notify } = useNotify();
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const getImages = async () => {
    ImagesApi.getAll()
      .then((data) => {
        setImages(data);
      })
      .catch((err) => notify(err.message));
  };

  useEffect(() => {
    getImages();
  }, []);

  const saveImages = async () => {
    if (files.length) {
      for (let i = 0, t = files.length; i < t; i++) {
        const selectedFile = files[i];
        const formData = new FormData();
        formData.append("myImage", selectedFile);
        ImagesApi.create(formData)
          .then(() => {
            setFiles([]);
            getImages();
          })
          .catch((err) => notify(err.message));
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={10} md={10} lg={10}>
          <Paper>
            <FormUpload files={files} setFiles={setFiles} />
          </Paper>
        </Grid>
        {!!files.length && (
          <Grid item xs={2} md={2} lg={2} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={saveImages}
            >
              Guardar
            </Button>
          </Grid>
        )}
      </Grid>
      {!!images.length && (
        <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
          <Paper>
            <TableImages images={images} />
          </Paper>
        </Grid>
      )}
    </Container>
  );
}
