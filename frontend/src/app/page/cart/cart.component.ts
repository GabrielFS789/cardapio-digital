import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: any[] = []
  total: number = 0;

  #cartService: CartService = inject(CartService)

  ngOnInit(): void {
    this.#cartService.items$.subscribe(items => {
      this.items = items;
      this.total = this.#cartService.totalCart()
      console.log(items)
    })
  }

  removeItemToCart(item: any){
    this.#cartService.removeItem(item)
  }
  
}
