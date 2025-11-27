import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';

import { ConfirmDialog } from './confirm/confirm-dialog';
import { Core } from './core/core';
import { EmpAddEdit } from './emp-add-edit/emp-add-edit';
import { Employee, EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ConfirmDialog,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email',
    'gender', 'dob', 'education', 'company',
    'experience', 'salary', 'action'
  ];

  // Initialize with empty data source
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: Core,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEdit);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployees(); // Refresh the list after adding
        }
      },
    });
  }

  // Fetch employees with loading state
  getEmployees() {
    this.isLoading = true;
    this._empService.getEmployees().subscribe({
      next: (res) => {
        console.log('Employees loaded:', res); 
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this._coreService.showError('Failed to load employees');
        this.isLoading = false;
        // Initialize with empty data source on error
        this.dataSource = new MatTableDataSource<Employee>([]);
        this._cdr.detectChanges();
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Delete employee with confirmation dialog
  deleteEmployee(id: number) {
    const dialogRef = this._dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._empService.deleteEmployee(id).subscribe({
          next: () => {
            this._coreService.openSnackBar('Employee deleted successfully!', 'Done');
            this.getEmployees();
          },
          error: (err) => {
            console.error('Error deleting employee:', err);
            this._coreService.showError('Failed to delete employee');
          },
        });
      }
    });
  }

  // Open edit form with employee data 
  openEditForm(row: Employee) {
    const dialogRef = this._dialog.open(EmpAddEdit, {
      data: row,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployees(); 
        }
      },
    });
  }

  formatSalary(salary: number): string {
    return salary?.toLocaleString('en-US') || '0';
  }

  // Get the total number of employees for display
  getTotalEmployees(): number {
    return this.dataSource.data.length;
  }

  // Check if there are employees to display
  hasEmployees(): boolean {
    return this.dataSource.data.length > 0;
  }
}