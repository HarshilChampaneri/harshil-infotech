import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.html',
  styleUrl: './ticker.css',
})
export class TickerComponent implements AfterViewInit, OnDestroy {

  @ViewChildren('tickerItem')
  tickerItems!: QueryList<ElementRef<HTMLElement>>;

  private speed = 70; // px/sec
  private gap = 38;
  private positions: number[] = [];
  private animationFrameId = 0;
  private lastTime = 0;
  private resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Run outside Angular so rAF doesn't trigger change detection every frame
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.initializeTicker());
      window.addEventListener('resize', this.handleResize);
    });
  }

  private initializeTicker(): void {
    const items = this.tickerItems.toArray();
    if (!items.length) return;

    this.positions = [];

    // Start the first item completely outside the LEFT side.
    let currentPosition = -items[0].nativeElement.offsetWidth;

    items.forEach((item) => {
      this.positions.push(currentPosition);
      currentPosition += item.nativeElement.offsetWidth + this.gap;
    });

    items.forEach((item, index) => {
      item.nativeElement.style.transform =
        `translate3d(${this.positions[index]}px, -50%, 0)`;
    });

    this.lastTime = performance.now();
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  private animate = (currentTime: number): void => {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    const items = this.tickerItems.toArray();
    if (!items.length) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    const tickerWidth =
      items[0].nativeElement.parentElement?.clientWidth ?? window.innerWidth;

    items.forEach((item, index) => {
      const element = item.nativeElement;

      // Move LEFT → RIGHT
      this.positions[index] += this.speed * deltaTime;

      const itemWidth = element.offsetWidth;

      // Fully exited on the right → recycle to the left
      if (this.positions[index] > tickerWidth) {
        let leftMostPosition = Infinity;

        items.forEach((_, otherIndex) => {
          if (otherIndex === index) return;
          leftMostPosition = Math.min(leftMostPosition, this.positions[otherIndex]);
        });

        this.positions[index] = leftMostPosition - itemWidth - this.gap;
      }

      element.style.transform = `translate3d(${this.positions[index]}px, -50%, 0)`;
    });

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private handleResize = (): void => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      cancelAnimationFrame(this.animationFrameId);
      requestAnimationFrame(() => this.initializeTicker());
    }, 150);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.resizeTimeout);
    window.removeEventListener('resize', this.handleResize);
  }
}