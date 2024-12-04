import { Component } from '@angular/core';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { IProduto } from '../../interfaces/IProduto.interface';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent {
  products$ = new BehaviorSubject<IProduto[]>([])


  constructor(private produtoService: ProductService) {
    this.produtoService.getProdutos().subscribe((products) => {
      this.products$.next(products)
    })
  }

}

