import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfreportComponent } from './pdfreport.component';

describe('PdfreportComponent', () => {
  let component: PdfreportComponent;
  let fixture: ComponentFixture<PdfreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
