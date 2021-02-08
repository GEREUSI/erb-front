import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent{

  textValue: string | null = null;
  hide = true;

  @Input() set text(value: string | null) {
    if (value !== this.textValue) {
      this.textValue = value;
      this.hide = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(private cdr: ChangeDetectorRef) { }

}
