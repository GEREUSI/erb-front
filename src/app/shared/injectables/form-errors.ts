import { Type } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: (error: any) => `This is a required field.`,
  email: (error: any) => `Invalid email.`,
  minlength: ({ requiredLength, actualLength }: any) => `Too short. Expected ${requiredLength} but got ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }: any) => `Too long. Expected ${requiredLength} but got ${actualLength}`,
};

export const FORM_ERROR: { providedIn: 'root'; factory: () => unknown } = {
  providedIn: 'root',
  factory: () => defaultErrors,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', FORM_ERROR);
