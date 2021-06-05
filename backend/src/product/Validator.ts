import {
  IsNotEmpty,
  IsOptional,
  validateSync,
  ValidationError,
} from 'class-validator';
import { INVALID_RESOURCE } from '../error/Types';
import { ApplicationError } from '../middlewares/Types';
import { IProduct } from './Types';

class ProductValidator implements Partial<IProduct> {
  @IsOptional()
  key: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;
}

export function validateProduct(
  data: Partial<IProduct>
): [Partial<IProduct>, ApplicationError] {
  const validator = new ProductValidator();
  Object.assign(validator, data);

  const errors: ValidationError[] = validateSync(validator, {
    whitelist: true,
    forbidNonWhitelisted: false,
  });

  if (errors.length) {
    return [undefined, INVALID_RESOURCE(errors)];
  }

  return [data, undefined];
}
