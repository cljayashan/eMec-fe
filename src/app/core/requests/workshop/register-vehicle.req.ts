export interface RegisterVehicleAttributes {
  id: string;
  province: string;
  prefix: string;
  number: number;
  brand: string;
  model: string;
  version: string;
  yoM: number;
  yoR: number;
  remarks: string;
  ownerId: string;
  createdAt: string;
  createdBy: number;
}

export interface RegisterVehicleRequest {
  action: 'add';
  attributes: RegisterVehicleAttributes;
}

export function createRegisterVehiclePayload(form: any): RegisterVehicleRequest {

    console.log('Form Data:', form);
  return {
    action: 'add',
    attributes: {
      id: form.id,
      province: form.province,
      prefix: form.prefix,
      number: Number(form.number),
      brand: form.brand,
      model: form.model,
      version: form.version,
      yoM: form.yom,
      yoR: form.yor,
      remarks: form.remark,
      ownerId: form.ownerId,
      createdAt: new Date().toISOString(),
      createdBy: 0
    }
  };
}
