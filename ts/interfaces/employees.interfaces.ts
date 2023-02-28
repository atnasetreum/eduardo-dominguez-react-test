export interface ResponseEmployees {
  success: boolean;
  data: Data;
}

export interface Data {
  employees: Employee[];
}

export interface Employee {
  id: number;
  name: string;
  last_name: string;
  birthday: number;
}

export interface ResponseCreateEmployees {
  success: boolean;
  data: string;
}
