import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  createSubscription(subscriptionData: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.createSubscription, subscriptionData);
  }

  getAllSubscriptionsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(API_ENDPOINTS.subscriptionsByUserId(userId));
  }

}
