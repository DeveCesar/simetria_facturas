import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PconfigComponent } from './pconfig.component';

describe('PconfigComponent', () => {
  let component: PconfigComponent;
  let fixture: ComponentFixture<PconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
