import { provideRouter, Route } from '@angular/router';
import { LanguageFn } from 'highlight.js';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { provideMarkdown, MARKED_OPTIONS } from 'ngx-markdown';
import hljs from 'highlight.js';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ngx-charts';
import { ApplicationConfig, Provider } from '@angular/core';

import AnnotationPlugin from 'chartjs-plugin-annotation';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from 'chartjs-chart-financial';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './polar-area-chart/polar-area-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';
import { FinancialChartComponent } from './financial-chart/financial-chart.component';
import { LandingComponent } from './landing/landing.component';
import { provideClientHydration } from '@angular/platform-browser';

const routes: Route[] = [
  {
    path: 'line',
    component: LineChartComponent,
  },
  {
    path: 'bar',
    component: BarChartComponent,
  },
  {
    path: 'doughnut',
    component: DoughnutChartComponent,
  },
  {
    path: 'radar',
    component: RadarChartComponent,
  },
  {
    path: 'pie',
    component: PieChartComponent,
  },
  {
    path: 'polar-area',
    component: PolarAreaChartComponent,
  },
  {
    path: 'bubble',
    component: BubbleChartComponent,
  },
  {
    path: 'scatter',
    component: ScatterChartComponent,
  },
  {
    path: 'dynamic',
    component: DynamicChartComponent,
  },
  {
    path: 'financial',
    component: FinancialChartComponent,
  },
  { path: '', component: LandingComponent },
];

const hljsLanguages = (): { [name: string]: Partial<LanguageFn> } => ({
  typescript: () => import('highlight.js/lib/languages/typescript'),
  xml: () => import('highlight.js/lib/languages/xml'),
});

export const provideHighlightjs = (): Provider[] => [
  {
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: hljsLanguages(),
    },
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideMarkdown({ loader: HttpClient }),
    {
      provide: MARKED_OPTIONS,
      useValue: {
        highlight: (code: string, lang: string) => {
          try {
            // Register TypeScript language if not already registered
            if (lang === 'typescript' && !hljs.getLanguage('typescript')) {
              import('highlight.js/lib/languages/typescript').then((tsLang) => {
                hljs.registerLanguage('typescript', tsLang.default);
              });
            }
            
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
          } catch (err) {
            // Fallback: escape HTML and return plain code
            return code
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
          }
        },
      },
    },
    provideAnimations(),
    provideCharts(
      withDefaultRegisterables(
        CandlestickController,
        CandlestickElement,
        OhlcController,
        OhlcElement,
        DataLabelsPlugin,
        AnnotationPlugin,
      ),
      {
        defaults: {
          // For consistent rendering across CI and local envs
          font: { family: 'Arial' },
        },
      },
    ),
    provideHighlightjs(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
