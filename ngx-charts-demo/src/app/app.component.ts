import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { ChartOptions } from 'chart.js';
import { ThemeService } from 'ngx-charts';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

const darkThemeClass = 'dark-theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatSlideToggle,
    FormsModule,
  ],
})
export class AppComponent implements AfterViewInit {
  public isDarkTheme = false;

  public themeChanged() {
    this.renderer.removeClass(this.document.body, darkThemeClass);

    let overrides: ChartOptions;

    if (this.isDarkTheme) {
      this.renderer.addClass(this.document.body, darkThemeClass);

      overrides = {
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
          datalabels: {
            color: 'white',
          },
        },
      };
    } else {
      overrides = {
        scales: undefined,
        plugins: undefined,
      };
    }

    this.themeService.setColorschemesOptions(overrides);
  }

  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup | undefined;
  @ViewChildren('tab', { read: ElementRef }) tabElements:
    | QueryList<ElementRef>
    | undefined;
  tabLabels: string[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private themeService: ThemeService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    if (this.tabElements) {
      this.tabLabels = this.tabElements.map((r) =>
        r.nativeElement.getAttribute('label').replace(/ /g, ''),
      );
    }
  }
}
