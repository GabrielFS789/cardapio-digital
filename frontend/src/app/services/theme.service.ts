import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeSignal = signal<string>("light-theme")

  setTheme(theme: string) {
    this.themeSignal.set(theme)
  }

  updateTheme() {
    this.themeSignal.update((value) => (value === 'light-theme' ? 'dark-theme' : 'light-theme'));
  }


}
