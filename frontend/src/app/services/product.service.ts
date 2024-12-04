import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProduto } from '../interfaces/IProduto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/produto`;

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<IProduto[]> {
    return this.http.get<IProduto[]>(this.apiUrl).pipe(
      map((prod) =>
        prod.map((prod) => {
          prod.imagemUrl = `${environment.apiUrl}${prod.imagemUrl}`;
          return prod;
        })
      )
    );
  }

  uploadImage(image: File): Observable<any>{
    const formData = new FormData();
    formData.append('imagem', image)
    return this.http.post<any>(`${this.apiUrl}/image`, formData)
  }

  create(produto: IProduto) {
    return this.http.post<IProduto>(this.apiUrl, produto)
  }
}
