import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  host: {
    class: ''
  }
})
export class ToolbarComponent {
  themService: ThemeService = inject(ThemeService)
  @Output() showCartEmitter = new EventEmitter<void>()
  isChecked = false;
  expression = true
  toggleTheme(){
    this.isChecked = !this.isChecked
    this.themService.updateTheme();
  }

  toggleCart(){
    this.showCartEmitter.next();
    }


}
