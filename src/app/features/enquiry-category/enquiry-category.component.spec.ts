import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryCategoryComponent } from './enquiry-category.component';

describe('EnquiryCategoryComponent', () => {
  let component: EnquiryCategoryComponent;
  let fixture: ComponentFixture<EnquiryCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
