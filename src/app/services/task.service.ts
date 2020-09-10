import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
}
