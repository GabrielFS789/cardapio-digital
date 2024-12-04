import { NgClass } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { ThemeService } from './services/theme.service';
import { MaterialModule } from './material/material.module';
import { CartComponent } from "./page/cart/cart.component";
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, ToolbarComponent, MaterialModule, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('drawer') drawer!: MatDrawer;
  title = 'frontend'
  themeService: ThemeService = inject(ThemeService)

  toggleDrawer(){
    this.drawer.toggle();
  }
}
