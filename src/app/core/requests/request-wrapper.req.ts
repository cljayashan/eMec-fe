export class RequestWrapper<T = any> {
  Action!: string;
  Args?: string[];
  Attributes!: T;
}
