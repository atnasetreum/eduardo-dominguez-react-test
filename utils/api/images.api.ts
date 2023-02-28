import axios from "axios";

const basePath = "/api";

async function getAll() {
  const { data } = await axios.get(`${basePath}/images`);
  return data as string[];
}

async function create(formData: FormData) {
  const { data } = await axios.post(`${basePath}/image`, formData);
  return data as { done: string };
}

export const ImagesApi = {
  getAll,
  create,
};
