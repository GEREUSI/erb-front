import { InjectionToken } from '@angular/core';

export const defaultErrors = {
    required: (error: any) => `This is a required field.`,
    email: (error: any) => `Invalid email.`,
    minlength: ({ requiredLength, actualLength }: any) => `Too short. Expected ${requiredLength} but got ${actualLength}`,
    maxlength: ({ requiredLength, actualLength }: any) => `Too long. Expected ${requiredLength} but got ${actualLength}`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors
});
