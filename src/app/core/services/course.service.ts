import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModel } from '../../shared/models/course-model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAll(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(`${this.apiUrl}/courses`);
  }

  getById(id: string): Observable<CourseModel> {
    return this.http.get<CourseModel>(`${this.apiUrl}/courses/${id}`);
  }

  searchByName(name: string): Observable<CourseModel[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<CourseModel[]>(`${this.apiUrl}/courses/search`, { params });
  }

  create(course: CourseModel): Observable<CourseModel> {
    return this.http.post<CourseModel>(`${this.apiUrl}/courses`, course);
  }

  update(id: string, course: CourseModel): Observable<CourseModel> {
    return this.http.put<CourseModel>(`${this.apiUrl}/courses/${id}`, course);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }
}
