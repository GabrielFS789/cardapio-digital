import { Routes } from '@angular/router';
import ProductsComponent from './page/products/products.component';

export const routes: Routes = [
    {
        path: '',
        title: 'produtos',
        component: ProductsComponent
    },
    {
        path: 'cadastro',
        title: 'Detalhe Produto',
        loadComponent: () => import('./page/products-detail/products-detail.component').then(c => c.ProductsDetailComponent)
    }
];
