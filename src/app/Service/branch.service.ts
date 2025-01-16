import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { branch } from '../model/branches';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private apiUrl = 'https://app.cubicsystems.com:9433/RetailOnboardingAPIs/api/getBranches';

  constructor(private http: HttpClient) {}

  getBranches(): Observable<any> {
    debugger
    return this.http.get<any>(this.apiUrl);
  }
}
