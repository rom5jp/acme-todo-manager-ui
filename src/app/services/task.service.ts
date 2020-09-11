import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = `${environment.apiURL}/tasks`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`).pipe(
      catchError((err: any) => throwError(err)),
    );
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task)
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Task>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
}
