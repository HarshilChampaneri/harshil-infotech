import { Component, inject } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { TickerComponent } from './components/ticker/ticker';
import { ServicesComponent } from './components/services/services';
import { ExpertiseComponent } from './components/expertise/expertise';
import { BrandsComponent } from './components/brands/brands';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    TickerComponent,
    ServicesComponent,
    ExpertiseComponent,
    BrandsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private themeService = inject(ThemeService);

  theme = this.themeService.theme;
}
