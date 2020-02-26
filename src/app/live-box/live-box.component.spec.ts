import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBoxComponent } from './live-box.component';

describe('LiveBoxComponent', () => {
  let component: LiveBoxComponent;
  let fixture: ComponentFixture<LiveBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
