import moment from "moment";
import "moment/locale/es";

export const formatDate = (date: number | Date) => moment(date).format("LL");

export const formatDateComparation = (date: number | Date) =>
  moment(date).format("YYYY-MM-DD");

export const formatDataBase = (date: number | Date) =>
  moment(date).format("YYYY/MM/DD");

export const isValidDate = (date: number | Date) => moment(date).isValid();
