import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  Directive,
  Inject,
  Self,
  Optional,
  Host,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { FORM_ERRORS } from '../injectables/form-errors';
import { FormSubmitDirective } from './form-submit.directive';
import { EMPTY, merge } from 'rxjs';
import { ControlErrorComponent } from '../components/control-error/control-error.component';

@Directive({
  /* tslint:disable:directive-selector */
  selector: '[formControl], [formControlName]',
  /* tslint:enable:directive-selector */
})
export class FormControlValidationDirective implements OnInit, OnDestroy {
  controlErrorRef?: ComponentRef<ControlErrorComponent>;

  constructor(
    private errorContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Self() private control: NgControl,
    @Optional() @Host() private form: FormSubmitDirective,
    @Inject(FORM_ERRORS) private errorMessageFactories: any
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    merge(this.form?.submit$ ?? EMPTY, this.control?.valueChanges ?? EMPTY)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const controlErrors = this.control?.errors;
        const errorMessage = controlErrors ? this.createErrorMessage(controlErrors) : null;
        this.setError(errorMessage);
      });
  }

  setError(text: string | null): void {
    if (!this.controlErrorRef) {
      this.controlErrorRef = this.constructControlErrorRef();
    }

    this.controlErrorRef.instance.text = text;
  }

  createErrorMessage(errors: ValidationErrors): string {
    const errorKey = Object.keys(errors)[0];
    const errorMessageFactory = this.errorMessageFactories[errorKey];
    return errorMessageFactory(errors[errorKey]);
  }

  constructControlErrorRef(): ComponentRef<ControlErrorComponent> {
    const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
    return this.errorContainer.createComponent(factory);
  }
}
