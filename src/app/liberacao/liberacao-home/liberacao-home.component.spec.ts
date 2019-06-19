import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberacaoHomeComponent } from './liberacao-home.component';

describe('LiberacaoHomeComponent', () => {
  let component: LiberacaoHomeComponent;
  let fixture: ComponentFixture<LiberacaoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiberacaoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiberacaoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
