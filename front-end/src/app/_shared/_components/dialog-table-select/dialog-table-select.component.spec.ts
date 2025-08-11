import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTableSelectComponent } from './dialog-table-select.component';

describe('DialogTableSelectComponent', () => {
  let component: DialogTableSelectComponent;
  let fixture: ComponentFixture<DialogTableSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTableSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
