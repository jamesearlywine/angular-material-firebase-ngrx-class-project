import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTimerDialogComponent } from './stop-timer-dialog.component';

describe('StopTimerDialogComponent', () => {
  let component: StopTimerDialogComponent;
  let fixture: ComponentFixture<StopTimerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopTimerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopTimerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
