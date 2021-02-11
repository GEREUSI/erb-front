import { ComponentFactoryResolver, ElementRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Mock } from 'protractor/built/driverProviders';
import { FormControlValidationDirective } from './form-control-validation.directive';
import { FormSubmitDirective } from './form-submit.directive';

describe('FormControlValidationDirective', () => {
  let directive: FormControlValidationDirective;

  beforeEach(async () => {
    directive = new FormControlValidationDirective(
      {} as ViewContainerRef,
      {} as ComponentFactoryResolver,
      {} as NgControl,
      {} as FormSubmitDirective,
      {}
    );
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
