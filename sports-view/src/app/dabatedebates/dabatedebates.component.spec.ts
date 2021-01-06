import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DabatedebatesComponent } from './dabatedebates.component';

describe('DabatedebatesComponent', () => {
  let component: DabatedebatesComponent;
  let fixture: ComponentFixture<DabatedebatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DabatedebatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DabatedebatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
