import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Core } from '../core/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './emp-add-edit.html',
  styleUrls: ['./emp-add-edit.scss'],
})
export class EmpAddEdit implements OnInit {
  empForm: FormGroup;
  isSubmitting: boolean = false;

  private _fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<EmpAddEdit>);
  private _empService = inject(EmployeeService);
  private _cdr = inject(ChangeDetectorRef);
  public data = inject(MAT_DIALOG_DATA, { optional: true });
  private _coreService = inject(Core);

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'PostGraduate'
  ];

  constructor() {
    this.empForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      salary: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
      this._cdr.detectChanges(); 
    }
  }

  // Handle form submission for add/edit
  onFormSubmit() {
    if (this.empForm.invalid) {
      this.markFormGroupTouched();
      this._coreService.showError('Please fill all required fields correctly');
      return;
    }

    this.isSubmitting = true;

    if (this.data) {
      // Update existing employee
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next: () => {
          this._coreService.openSnackBar('Employee updated successfully!', 'Done');
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error(err);
          this._coreService.showError('Failed to update employee');
          this.isSubmitting = false;
          this._cdr.detectChanges(); 
        },
      });
    } else {
      // Add new employee
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: () => {
          this._coreService.openSnackBar('Employee added successfully!', 'Done');
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error(err);
          this._coreService.showError('Failed to add employee');
          this.isSubmitting = false;
          this._cdr.detectChanges(); 
        },
      });
    }
  }

  
  private markFormGroupTouched() {
    Object.keys(this.empForm.controls).forEach(key => {
      const control = this.empForm.get(key);
      control?.markAsTouched();
    });
  }

  close() {
    this._dialogRef.close();
  }

  // Get form field error message
  getFieldError(fieldName: string): string {
    const field = this.empForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['min']) {
        return `Value must be at least ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `Value cannot exceed ${field.errors['max'].max}`;
      }
    }
    return '';
  }
}