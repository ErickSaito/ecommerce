import { ValidationError } from 'class-validator';
import { ApplicationError } from '../middlewares/Types';
import { buildDescription } from './Utils';

export const RESOURCE_NOT_FOUND = (key: string): ApplicationError => ({
  status: 404,
  type: 'RESOURCE_NOT_FOUND',
  message: 'Recurso não encontrado',
  description: `Recurso (${key}) was not found`,
});

export const INVALID_RESOURCE = (
  fields?: ValidationError[]
): ApplicationError => ({
  status: 400,
  type: 'INVALID_RESOURCE',
  message: 'Dados inválidos',
  description: fields ? buildDescription(fields) : '',
  fields,
});
