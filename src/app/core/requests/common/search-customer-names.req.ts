import { API_ACTIONS } from "../../../constants/api-actions";

export interface SearchCustomerNamesAttributes {
  name?: string;
}

export interface SearchCustomerNamesRequest {
  Action: string;
  Attributes: SearchCustomerNamesAttributes;
}

export function createSearchCustomerPayload(name?: string): SearchCustomerNamesRequest {
  return {
    Action: API_ACTIONS.LIST,
    Attributes: {
      name: name || ''
    }
  };
}
