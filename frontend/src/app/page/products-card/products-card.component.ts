import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { IProduto } from '../../interfaces/IProduto.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss'
})
export class ProductsCardComponent {
  @Input() productInput?:IProduto
  #cartService: CartService = inject(CartService)

  addProductToCart(product: IProduto){
    this.#cartService.addItem(product)
  }

  removeProductToCart(product: IProduto){
    this.#cartService.removeItem(product)
  }
}
