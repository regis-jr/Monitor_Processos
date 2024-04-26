import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcessData } from './process-data';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private apiUrl = 'https://localhost:7079/api/Process';

  constructor(private http: HttpClient) { }

  getProcesses(): Observable<ProcessData[]> {
    return this.http.get<ProcessData[]>(this.apiUrl);
  }
}
