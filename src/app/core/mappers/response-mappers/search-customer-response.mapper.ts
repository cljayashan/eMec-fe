import { ICustomer } from '../../models/workshop/customer';
import { IOwnerNameListDropdownVm } from '../../vm/common/owner-name-list-dropdown.vm';

export function mapSearchCustomerResponseToOwnerNameVm(
  customers: ICustomer[]
): IOwnerNameListDropdownVm[] {
  return customers.map((customer) => {
    let customerListForDropDownVm: IOwnerNameListDropdownVm = {} as IOwnerNameListDropdownVm;
    customerListForDropDownVm.id = customer.id ?? '';
    customerListForDropDownVm.FulName = `${customer.fName ?? ''} ${customer.lName ?? ''}`.trim();
    return customerListForDropDownVm;
  });
}
