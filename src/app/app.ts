import { Component, signal, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('Property Hub');
  private observer: IntersectionObserver | null = null;
  private routeSubscription: any;

  constructor(private el: ElementRef, private router: Router) { }

  ngAfterViewInit() {
    this.setupObserver();

    // Re-run observer when route changes to catch new DOM elements
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => this.setupObserver(), 200);
    });
  }

  private setupObserver() {
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach(el => this.observer?.observe(el));
  }

  ngOnDestroy() {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.observer) this.observer.disconnect();
  }
}
