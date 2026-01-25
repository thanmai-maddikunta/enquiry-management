import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeatureService } from '../feature.service';


@Component({
  selector: 'app-enquiry-submit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enquiry-submit.component.html',
  styleUrls: ['./enquiry-submit.component.css']
})
export class EnquirySubmitComponent implements OnInit {
  private fb = inject(FormBuilder);
  private __featureService = inject(FeatureService);

  enquiryForm!: FormGroup;
  submitted = false;
  statusList: any[] = [];
  categoryList: any[] = [];

  // Dropdown data
  enquiryTypes = [
    { value: 'General', label: 'General' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Support', label: 'Support' }
  ];
  ngOnInit(): void {
    this.initializeForm();
    this.getStatus();
    this.getCategories();
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
      followUpDate: ['', Validators.required],
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

  // the api is sending more than 100 entires, so I am filtering to get first 5 statuses which I actually needed - using public api 
  getStatus() {
    this.__featureService.getAllStatus().subscribe((result: any) => {
      this.statusList = result.data.filter((status: { statusId: number; }) => status.statusId < 6);
    })
  }

  getCategories() {
    this.__featureService.getAllCategories().subscribe((result: any) => {
      this.categoryList = result.data.filter((category: { categoryId: number; }) => category.categoryId < 4);
    })
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.enquiryForm.valid) {
      const formData = {
        ...this.enquiryForm.value,
        enquiryDate: new Date().toISOString()
      };
      this.__featureService.saveEnquiry(formData).subscribe({
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
