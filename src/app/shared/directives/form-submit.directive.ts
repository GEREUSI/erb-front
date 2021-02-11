import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Directive({
  /* tslint:disable:directive-selector */
  selector: 'form',
  /* tslint:enable:directive-selector */
})
export class FormSubmitDirective {
  submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

  constructor(private host: ElementRef<HTMLFormElement>) {}

  get element(): HTMLFormElement {
    return this.host.nativeElement;
  }
}
