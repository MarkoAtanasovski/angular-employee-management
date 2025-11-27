import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, delay } from 'rxjs';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
  education: string;
  company: string;
  experience: number;
  salary: number;
  created_at: string;
  updated_at: string;
}


export interface NewEmployee {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
  education: string;
  company: string;
  experience: number;
  salary: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/employees';

  
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  // Initial mock data
  private initialEmployees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      dob: '1990-01-15',
      education: 'Graduate',
      company: 'Tech Corp',
      experience: 5,
      salary: 60000,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      gender: 'Female',
      dob: '1985-05-20',
      education: 'PostGraduate',
      company: 'Innovate Ltd',
      experience: 8,
      salary: 75000,
      created_at: '2023-01-02T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      gender: 'Male',
      dob: '1992-08-10',
      education: 'Intermediate',
      company: 'Service Co',
      experience: 3,
      salary: 45000,
      created_at: '2023-01-03T00:00:00Z',
      updated_at: '2023-01-03T00:00:00Z'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
      gender: 'Female',
      dob: '1988-12-05',
      education: 'Diploma',
      company: 'Design Studio',
      experience: 6,
      salary: 55000,
      created_at: '2023-01-04T00:00:00Z',
      updated_at: '2023-01-04T00:00:00Z'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@example.com',
      gender: 'Male',
      dob: '1995-03-25',
      education: 'Matric',
      company: 'Retail Inc',
      experience: 2,
      salary: 35000,
      created_at: '2023-01-05T00:00:00Z',
      updated_at: '2023-01-05T00:00:00Z'
    }
  ];

  constructor() {
    // Initialize with mock data
    this.employeesSubject.next([...this.initialEmployees]);
  }

  private simulateDelay<T>() {
    return delay<T>(1000);
  }

  addEmployee(emp: NewEmployee): Observable<Employee> {
    return new Observable<Employee>(observer => {
      setTimeout(() => {
        const newEmployee: Employee = {
          ...emp,
          id: Math.floor(Math.random() * 100000), 
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Update the state
        const currentEmployees = this.employeesSubject.value;
        const updatedEmployees = [...currentEmployees, newEmployee];
        this.employeesSubject.next(updatedEmployees);

        observer.next(newEmployee);
        observer.complete();
      }, 1000);
    });
  }

  updateEmployee(id: number, emp: Partial<Employee>): Observable<Employee> {
    return new Observable<Employee>(observer => {
      setTimeout(() => {
        const currentEmployees = this.employeesSubject.value;
        const employeeIndex = currentEmployees.findIndex(e => e.id === id);
        
        if (employeeIndex === -1) {
          observer.error('Employee not found');
          return;
        }

        const updatedEmployee: Employee = {
          ...currentEmployees[employeeIndex],
          ...emp,
          updated_at: new Date().toISOString()
        };

        // Update the state
        const updatedEmployees = [...currentEmployees];
        updatedEmployees[employeeIndex] = updatedEmployee;
        this.employeesSubject.next(updatedEmployees);

        observer.next(updatedEmployee);
        observer.complete();
      }, 1000);
    });
  }

  getEmployees(): Observable<Employee[]> {
    return new Observable<Employee[]>(observer => {
      setTimeout(() => {
        observer.next([...this.employeesSubject.value]);
        observer.complete();
      }, 1000);
    });
  }

  deleteEmployee(id: number): Observable<{ success: boolean }> {
    return new Observable<{ success: boolean }>(observer => {
      setTimeout(() => {
        const currentEmployees = this.employeesSubject.value;
        const updatedEmployees = currentEmployees.filter(emp => emp.id !== id);
        this.employeesSubject.next(updatedEmployees);

        observer.next({ success: true });
        observer.complete();
      }, 1000);
    });
  }

  getCurrentEmployees(): Employee[] {
    return this.employeesSubject.value;
  }
}