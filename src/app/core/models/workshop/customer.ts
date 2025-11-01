export interface ICustomer {
  id?: string;
  fName?: string;
  lName?: string;
  address?: string | null;
  nic?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  type?: number;
}