import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Simulation } from '../models/simulation';
import { apiUrl } from '../../constant';
import { catchError, firstValueFrom, of, retry, throwError } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

interface SimulationParams {
  productCode: string;
  vehicleCategoryCode: string;
  userId: string;
  valueNew: number;
  valueVenal: number;
  power: number;
  circulationDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {
  private httpClient = inject(HttpClient);

  getAllSimulations() {
    const request = this.httpClient.get<Simulation[]>(`${apiUrl}/simulations`).pipe(
      retry(3), catchError((err) => throwError(() => new Error(err.message, err)))
    );
    return firstValueFrom(request);
  }

  getAllProducts() {
    const request = this.httpClient.get<Product[]>(`${apiUrl}/products`).pipe(
      retry(3), catchError((err) => throwError(() => new Error(err.message, err)))
    );
    return firstValueFrom(request);
  }

  getAllCategories() {
    const request = this.httpClient.get<Category[]>(`${apiUrl}/categories`).pipe(
      retry(3), catchError((err) => throwError(() => new Error(err.message, err)))
    );
    return firstValueFrom(request);
  }

  getSingleSimulation(quoteReference: string) {
    const request = this.httpClient.get<Simulation>(`${apiUrl}/simulations/${quoteReference}`).pipe(
      retry(3), catchError((err) => throwError(() => new Error(err.message, err)))
    );
    return firstValueFrom(request);
  }

  createSimulation(simulationParams: SimulationParams) {
    const request = this.httpClient.post<Simulation>(`${apiUrl}/simulations/`, {
      ...simulationParams
    }).pipe(catchError((err) => throwError(() => new Error(err.error.message, {cause: err.error.statusCode}))));
    return firstValueFrom(request);
  }
}
