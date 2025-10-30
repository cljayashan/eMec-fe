import { ICustomer } from '../../models/workshop/customer';
import { IOwnerNameListDropdownVm } from '../../vm/common/owner-name-list-dropdown.vm';

// Manually maps an array of ICustomer objects to IOwnerNameListDropdownVm objects
export function mapSearchCustomerResponseToOwnerNameVm(customers: ICustomer[]): IOwnerNameListDropdownVm[] {
  return customers.map(customer => {
    const vm = new IOwnerNameListDropdownVm();
    vm.id = customer.id ?? '';
    vm.FName = customer.fName ?? '';
    vm.LName = customer.lName ?? '';
    return vm;
  });
}
