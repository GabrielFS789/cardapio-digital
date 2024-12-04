import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduto } from '../interfaces/IProduto.interface';
import { ICart } from '../interfaces/ICart.iterface';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _snackBar = inject(MatSnackBar)


  private itemCart: BehaviorSubject<any[]> = new BehaviorSubject<ICart[]>([]);
  public items$: Observable<any[]> = this.itemCart.asObservable();

  addItem(product: IProduto) {
    const items = this.itemCart.getValue();
    items.push(product)
    this.itemCart.next(items)
    this._snackBar.open(`${product.nome} adicionado com sucesso`, '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  removeItem(item: IProduto) {
    const items = this.itemCart.getValue();
    const index = items.findIndex(prod => prod.nome === item.nome)
    if (index !== -1) {
      if (items[index].quantidade > 1) {
        items[index].quantidade--;
      }
      else {
        items.splice(index, 1)
      }
      this.itemCart.next(items)
    }
  }

  clearCart() {
    this.itemCart.next([])
  }

  totalCart(){
    const items = this.itemCart.getValue();
    return items.reduce((total, produto) => total + produto.precoVenda, 0)
  }

}
