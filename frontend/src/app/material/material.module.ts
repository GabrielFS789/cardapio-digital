import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';



const MODULES = [MatIconModule,
  MatDividerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatListModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatCardModule]

@NgModule({
  declarations: [],
  imports: [MODULES],
  exports: [MODULES]
})
export class MaterialModule { }
