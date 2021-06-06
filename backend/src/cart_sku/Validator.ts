import {
  IsNotEmpty,
  IsOptional,
  validateSync,
  ValidationError,
} from 'class-validator';
import { INVALID_RESOURCE } from '../error/Types';
import { ApplicationError } from '../middlewares/Types';
import { ICartSku } from './Types';

class CartSkuValidator implements Partial<ICartSku> {
  @IsOptional()
  key: string;

  @IsNotEmpty()
  card_key: string;

  @IsNotEmpty()
  sku_key: string;
}

export function validateCartSku(
  data: Partial<ICartSku>
): [Partial<ICartSku>, ApplicationError] {
  const validator = new CartSkuValidator();
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
