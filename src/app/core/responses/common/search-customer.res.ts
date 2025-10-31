import { ResponseWrapper } from '../response-wrapper.res';
import { ICustomer } from '../../models/workshop/customer';

export class SearchCustomerResponse extends ResponseWrapper<
  ICustomer[]
> {}


