import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortariaHomeComponent } from './portaria-home.component';

describe('PortariaHomeComponent', () => {
  let component: PortariaHomeComponent;
  let fixture: ComponentFixture<PortariaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortariaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortariaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
