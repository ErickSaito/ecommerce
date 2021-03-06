import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ValidationError } from 'class-validator';

export interface ResponseAPI<T = any, E = any> {
  status: number;
  success: boolean;
  data?: T;
  results?: T[];
  message?: string;
  metadata?: ResponseMetadata;
  error?: E;
  links?: any;
}

export interface ResponseMetadata {
  count: number;
  offset: number;
  limit: number;
  next?: string;
  previous?: string;
}

export interface Options extends AxiosRequestConfig {
  cacheControl?: string;
  axiosInstance?: AxiosInstance;
}

export interface ApplicationError<T = any> {
  status: number;
  type: string;
  message: string;
  description: string;
  fields?: ValidationError[];
  data?: T;
}
