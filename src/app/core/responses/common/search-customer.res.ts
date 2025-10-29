import { ResponseBase } from '../base.res';

export class SearchCustomerResult {
  id!: string;
  name!: string;
}

export class SearchCustomerResponse extends ResponseBase<SearchCustomerResult[]> {}
