import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorComponent } from './control-error.component';

describe('ControlErrorComponent', () => {
  let component: ControlErrorComponent;
  let fixture: ComponentFixture<ControlErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('detectChanges', () => {
    it('should not change anything', () => {
      component.value = null;
      component.textValue = null;
      component.detectChanges();

      expect(component.textValue).toEqual(null);
      expect(component.hide).toEqual(true);
    });
    it('should change text value and set hide to false', () => {
      component.value = 'yes';
      component.textValue = '';
      component.detectChanges();

      expect(component.textValue).toEqual('yes');
      expect(component.hide).toEqual(false);
    });
  });
});
