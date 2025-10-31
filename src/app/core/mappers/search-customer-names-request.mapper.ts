import { SearchCustomerNamesAttributes } from '../requests/common/search-customer-names.req';
import { RequestWrapper } from '../requests/request-wrapper.req';

export function mapToSearchCustomerNamesRequest(
  attributes: SearchCustomerNamesAttributes,
  action: string,
  args?: string[]
): RequestWrapper<SearchCustomerNamesAttributes> {
  const wrapper = new RequestWrapper<SearchCustomerNamesAttributes>();
  wrapper.Action = action;
  wrapper.Attributes = attributes;
  if (args) wrapper.Args = args;
  return wrapper;
}
