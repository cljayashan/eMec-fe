
//This is the wrapper base response class for all API
export class ResponseWrapper<T = any> {
	isSuccess!: boolean;
	result?: T;
	error?: ErrorMessage;
	constructor(init?: Partial<ResponseWrapper<T>>) {
		Object.assign(this, init);
	}
}

export interface ErrorMessage {
	message?: string;
	code?: string | number;
}

// Example inherited classes
import { CustomerName } from '../services/customer.service';
export class CustomerSearchResponse extends ResponseWrapper<CustomerName[]> {}

// If you have a Vehicle type, you can add:
// import { Vehicle } from '../services/vehicle.service';
// export class VehicleSearchResponse extends ResponseBase<Vehicle[]> {}
