import { ElementRef } from '@angular/core';
import { FormSubmitDirective } from './form-submit.directive';

describe('FormSubmitDirective', () => {
  let directive: FormSubmitDirective;
  beforeEach(async () => {
    directive = new FormSubmitDirective({} as ElementRef<HTMLFormElement>);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
