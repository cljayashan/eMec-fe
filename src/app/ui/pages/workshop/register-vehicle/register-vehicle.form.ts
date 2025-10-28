import { FormGroup, FormControl, Validators } from '@angular/forms';
export abstract class RegisterVehicleForm {
  vehicleTypeControl = new FormControl<string>('', Validators.required);
  provinceControl = new FormControl<string>('', Validators.required);
  prefixControl = new FormControl<string>('', Validators.required);
  numberControl = new FormControl<string>('', [
    Validators.required,
    Validators.pattern('^\\d{4}$'),
  ]);
  brandControl = new FormControl<string>('', Validators.required);
  modelControl = new FormControl<string>('', Validators.required);
  versionControl = new FormControl<string | null>('');
  yomControl = new FormControl<number | null>(null);
  yorControl = new FormControl<number | null>(null);
  remarkControl = new FormControl<string | null>('');
  ownerIdControl = new FormControl<string>('', Validators.required);

  registerVehicleFormGroup = new FormGroup({
    vehicleType: this.vehicleTypeControl,
    province: this.provinceControl,
    prefix: this.prefixControl,
    number: this.numberControl,
    brand: this.brandControl,
    model: this.modelControl,
    version: this.versionControl,
    yom: this.yomControl,
    yor: this.yorControl,
    remark: this.remarkControl,
    ownerId: this.ownerIdControl,
  });
}
