import { defaultErrors, FORM_ERROR } from './form-errors';

describe('FORM_ERROR', () => {
  it('should return defaultErrors', () => {
    expect(FORM_ERROR.factory()).toEqual(defaultErrors);
  });
});

describe('defaultErrors', () => {
  it('should return required error message', () => {
    expect(defaultErrors.required('yes')).toEqual(`This is a required field.`);
  });
  it('should return email error message', () => {
    expect(defaultErrors.email('yes')).toEqual(`Invalid email.`);
  });
  it('should return minLength error message', () => {
    expect(defaultErrors.minlength({ requiredLength: 2, actualLength: 1 })).toEqual(`Too short. Expected 2 but got 1`);
  });
  it('should return maxlength error message', () => {
    expect(defaultErrors.maxlength({ requiredLength: 1, actualLength: 2 })).toEqual(`Too long. Expected 1 but got 2`);
  });
});
