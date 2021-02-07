import { NgControl } from '@angular/forms';
import { Mock } from 'protractor/built/driverProviders';
import { FormControlValidationDirective } from './form-control-validation.directive';
import { FormSubmitDirective } from './form-submit.directive';

describe('FormControlValidationDirective', () => {
  it('should create an instance', () => {
    const directive = new FormControlValidationDirective();
    expect(directive).toBeTruthy();
  });
});
