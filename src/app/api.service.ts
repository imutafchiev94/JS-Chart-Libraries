import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://www.alphavantage.co/query'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Method to get data from the API
  getTimeSeriesData(symbol: string, apiKey: string): Observable<any> {
    const url = `${this.apiUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    return this.http.get<any>(url);  // Making GET request to Alpha Vantage API
  }
}