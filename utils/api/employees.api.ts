import {
  ResponseEmployees,
  ResponseCreateEmployees,
} from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/eduardo_san_miguel_dominguez_garcia";

async function getAll() {
  const { data } = await api.get(`${basePath}`);
  return data as ResponseEmployees;
}

async function create(payload: {
  name: string;
  last_name: string;
  birthday: string;
}) {
  const { data } = await api.post(`${basePath}`, payload);
  return data as ResponseCreateEmployees;
}

export const EmployeesApi = {
  getAll,
  create,
};
