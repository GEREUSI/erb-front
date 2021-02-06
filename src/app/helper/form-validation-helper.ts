import { FormGroup, ValidationErrors } from '@angular/forms';

export function constructIsValid(formGroup: FormGroup): (controlName: string) => boolean {
    return (controlName: string): boolean => {
        const control = formGroup.controls[controlName];
        return !control.invalid && (control.dirty || control.touched);
    };
}

export function constructIsInvalid(formGroup: FormGroup): (controlName: string) => boolean {
    return (controlName: string): boolean => {
        const control = formGroup.controls[controlName];
        return control.invalid && (control.dirty || control.touched);
    };
}

export function constructGetErrors(formGroup: FormGroup): (controlName: string) => ValidationErrors {
    return (controlName: string): ValidationErrors => {
        return formGroup.controls[controlName].errors ?? {};
    };
}
