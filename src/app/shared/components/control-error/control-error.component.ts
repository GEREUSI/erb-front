import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent {
  textValue: string | null = null;
  hide = true;

  @Input() value: string | null;

  constructor(private cdr: ChangeDetectorRef) {}

  public detectChanges(): void {
    if (this.value !== this.textValue) {
      this.textValue = this.value;
      this.hide = !this.value;
      this.cdr.detectChanges();
    }
  }
}
