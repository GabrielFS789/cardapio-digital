import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IProduto } from '../../interfaces/IProduto.interface';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss',
})
export class ProductsDetailComponent {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  #route?: Router = inject(Router);
  imageUrl: string | null = null;

  appearance: MatFormFieldAppearance = 'outline';
  productService: ProductService = inject(ProductService);

  productForm = new FormGroup({
    nome: new FormControl<string | null>('', [Validators.required]),
    descricao: new FormControl<string | null>(null),
    precoVenda: new FormControl<number>(Number(0), [Validators.required]),
    imagemUrl: new FormControl<string | null>(''),
    unidadeMedida: new FormControl<string>('UN'),
    observacao: new FormControl(<string | null>null),
    extra1: new FormControl<string | null>(null),
    extra2: new FormControl<string | null>(null),
    extra3: new FormControl<string | null>(null),
    extra4: new FormControl<string | null>(null),
    extra5: new FormControl<string | null>(null),
  });

  goBack() {
    this.#route?.navigate(['/']);
  }
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  create() {
    this.productService.uploadImage(this.selectedFile!).subscribe((urlImage) => {
      this.productForm.get('imagemUrl')?.setValue(urlImage.imageUrl)
      console.log(this.productForm.value)
      this.productService.create(this.productForm.value as IProduto).subscribe((res) =>{
        console.log(res)
      },
    (err) => {
      console.error(err)
    })
    });
  }
}
