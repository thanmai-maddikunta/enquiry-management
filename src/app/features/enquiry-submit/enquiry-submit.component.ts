import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeatureService } from '../feature.service';
import { EnquiryModel, ICategory, IStatus } from '../../model/enquiry.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-enquiry-submit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './enquiry-submit.component.html',
  styleUrls: ['./enquiry-submit.component.css']
})
export class EnquirySubmitComponent implements OnInit {
  private fb = inject(FormBuilder);
  private __featureService = inject(FeatureService);
  private destroyRef = inject(DestroyRef)

  enquiryForm!: FormGroup;
  submitted = false;
  $statusList: Observable<IStatus[]> = new Observable<IStatus[]>();
  $categoryList: Observable<ICategory[]> = new Observable<ICategory[]>();

  // Dropdown data
  enquiryTypes = [
    { value: 'General', label: 'General' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Support', label: 'Support' }
  ];
  constructor(){
    this.$statusList = this.__featureService.getAllStatus();
    this.$categoryList = this.__featureService.getAllCategories();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.enquiryForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: ['', Validators.required],
      statusId: [1, Validators.required],
      enquiryType: ['General', Validators.required],
      isConverted: [false],
      feedback: ['', Validators.minLength(5)]
    });
  }

  getControl(name: string) {
    return this.enquiryForm.get(name);
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.getControl(fieldName);
    return !!(field && field.hasError(errorType) && (field.touched || field.dirty || this.submitted));
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.enquiryForm.valid) {
      const formData: EnquiryModel = {
        ...this.enquiryForm.value,
        enquiryDate: new Date().toISOString()
      };
      const subscription = this.__featureService.saveEnquiry(formData).subscribe({
        next: (result: any) =>{
          console.log('Enquiry Saved:', result);
          alert('Enquiry submitted successfully!');
          this.resetForm();
        },
        error: (error: any) => {
          console.error('Error saving enquiry:', error);
          alert('There was an error submitting your enquiry. Please try again later.');
        }     
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      alert('Please fill all required fields correctly');
    }
  }

  resetForm(): void {
    this.enquiryForm.reset({
      statusId: 1,
      enquiryType: 'General',
      isConverted: false
    });
    this.submitted = false;
  }

  saveAsDraft(): void {
    const draftData = {
      ...this.enquiryForm.value,
      savedAt: new Date().toISOString(),
      isDraft: true
    };

    localStorage.setItem('enquiry_draft', JSON.stringify(draftData));
    console.log('Draft Saved:', draftData);
    alert('Enquiry saved as draft successfully!');
  }
}
