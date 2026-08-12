import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private themeService = inject(ThemeService);

  theme = this.themeService.theme;
  menuOpen = signal(false);
  isBrandOverflowing = signal(false);

  private brandNameWrap = viewChild<ElementRef<HTMLElement>>('brandNameWrap');
  private brandNameInner = viewChild<ElementRef<HTMLElement>>('brandNameInner');
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.checkOverflow();
    const wrap = this.brandNameWrap()?.nativeElement;
    if (wrap && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.checkOverflow());
      this.resizeObserver.observe(wrap);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.checkOverflow();
  }

  private checkOverflow(): void {
    const wrap = this.brandNameWrap()?.nativeElement;
    const inner = this.brandNameInner()?.nativeElement;
    if (!wrap || !inner) return;
    // Text only needs to marquee if it's actually wider than the space it's been given
    this.isBrandOverflowing.set(inner.scrollWidth > wrap.clientWidth);
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}