# @solidexpert/ngx-charts [![npm version](https://badge.fury.io/js/%40solidexpert%2Fngx-charts.svg)](https://www.npmjs.com/package/@solidexpert/ngx-charts) [![npm downloads](https://img.shields.io/npm/dm/%40solidexpert%2Fngx-charts.svg)](https://npmjs.org/@solidexpert/ngx-charts)

Beautiful charts for Angular based on Chart.js

## Features

- 🎨 **10 Chart Types**: Line, Bar, Radar, Pie, Polar Area, Doughnut, Bubble, Scatter, Dynamic, and Financial charts
- 📦 **Angular 19+ Support**: Built for modern Angular with standalone components
- 🎯 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🎨 **Theming**: Built-in support for light and dark themes
- 📱 **Responsive**: Charts automatically adapt to container size
- 🔧 **Customizable**: Full access to Chart.js configuration options

## Usage & Demo

### Live Demo

🌐 **Interactive Demo**: Visit our live demo page at [https://solidexpert-ltd.github.io/ngx-charts/](https://solidexpert-ltd.github.io/ngx-charts/)

The demo showcases:
- ✅ **All 10 Chart Types** with interactive examples
- ✅ **Real-time Chart Interactions** - see click and hover events in action
- ✅ **Light & Dark Theme Support** - toggle between themes
- ✅ **Complete Code Examples** - view the source code for each chart
- ✅ **Responsive Design** - see how charts adapt to different screen sizes

### Running the Demo Locally

To run the demo application locally:

```bash
npm start
```

The demo will be available at `http://localhost:4200`

For production build:

```bash
npm run build:prod
```

---

## Installation

### Using Angular CLI

You can install **@solidexpert/ngx-charts** using the Angular CLI:

```bash
ng add @solidexpert/ngx-charts
```

The required packages will be automatically installed, and your `app.config.ts` will be updated with the required changes to start using the library right away.

### Manual Installation

1. Install the package using npm:

   ```bash
   npm install @solidexpert/ngx-charts --save
   ```

   or yarn:

   ```bash
   yarn add @solidexpert/ngx-charts --save
   ```

2. Install Chart.js (peer dependency):

   ```bash
   npm install chart.js --save
   ```

   or with yarn:

   ```bash
   yarn add chart.js --save
   ```

3. Import the directive in your standalone component:

   ```typescript
   import { BaseChartDirective } from '@solidexpert/ngx-charts';

   @Component({
     standalone: true,
     imports: [BaseChartDirective],
   })
   export class MyComponent {}
   ```

4. Provide the chart configuration in your `app.config.ts` or `main.ts`:

   ```typescript
   import { provideCharts, withDefaultRegisterables } from '@solidexpert/ngx-charts';

   export const appConfig: ApplicationConfig = {
     providers: [
       provideCharts(withDefaultRegisterables()),
       // ... other providers
     ],
   };
   ```

   Or in `main.ts`:

   ```typescript
   import { provideCharts, withDefaultRegisterables } from '@solidexpert/ngx-charts';

   bootstrapApplication(AppComponent, {
     providers: [provideCharts(withDefaultRegisterables())],
   }).catch((err) => console.error(err));
   ```

   For minimal bundle size, register only the chart types you need:

   ```typescript
   import { BarController, Legend, Colors } from 'chart.js';
   import { provideCharts } from '@solidexpert/ngx-charts';

   provideCharts({ registerables: [BarController, Legend, Colors] });
   ```

## Angular Version Compatibility

| Angular Version | Library Version |
|----------------|-----------------|
| 19.x           | 19.x            |
| 18.x           | 18.x            |
| 17.x           | 17.x            |
| 16.x           | 16.x            |

This library follows Angular's versioning, with each major version supporting the corresponding Angular major version.

## Chart Types

The library supports all Chart.js chart types:

- **Line Chart** - Display data as a line
- **Bar Chart** - Display data as bars
- **Radar Chart** - Display data on a radar/spider chart
- **Pie Chart** - Display data as a pie chart
- **Polar Area Chart** - Display data in a polar area chart
- **Doughnut Chart** - Display data as a doughnut chart
- **Bubble Chart** - Display data as bubbles with x, y, and size values
- **Scatter Chart** - Display data as scatter points
- **Dynamic Chart** - Switch between chart types dynamically
- **Financial Chart** - Display financial data (Candlestick, OHLC)

## Basic Usage

### HTML Template

```html
<canvas
  baseChart
  [data]="chartData"
  [type]="'bar'"
  [options]="chartOptions"
  (chartClick)="chartClicked($event)"
  (chartHover)="chartHovered($event)"
></canvas>
```

### TypeScript Component

```typescript
import { Component } from '@angular/core';
import { BaseChartDirective } from '@solidexpert/ngx-charts';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <canvas
      baseChart
      [data]="barChartData"
      [type]="barChartType"
      [options]="barChartOptions"
      (chartClick)="chartClicked($event)"
      (chartHover)="chartHovered($event)"
    ></canvas>
  `,
})
export class ChartComponent {
  public barChartType = 'bar' as const;
  
  public barChartData: ChartData<'bar'> = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      { data: [65, 59, 80, 81, 56], label: 'Series A' },
      { data: [28, 48, 40, 19, 86], label: 'Series B' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }
}
```

## API Reference

### Properties

- **`type`** (`ChartType`) - The type of chart: `'line'`, `'bar'`, `'radar'`, `'pie'`, `'polarArea'`, `'doughnut'`, `'bubble'`, `'scatter'`, or any custom Chart.js type
- **`data`** (`ChartData<TType, TData, TLabel>`) - The chart data structure. See [Chart.js data structures](https://www.chartjs.org/docs/latest/general/data-structures.html)
- **`labels`** (`TLabel[]`) - Dataset labels (required for `line`, `bar`, `radar` charts)
- **`datasets`** (`ChartDataset<TType, TData>[]`) - Chart datasets array
- **`options`** (`ChartOptions<TType>`) - Chart configuration options (see [Chart.js options](https://www.chartjs.org/docs/latest/general/options.html))
- **`legend`** (`boolean`) - Show/hide legend (default: `false`)

### Events

- **`chartClick`** - Fired when a chart is clicked, returns event and active elements
- **`chartHover`** - Fired when hovering over a chart, returns event and active elements

### Accessing Chart Instance

You can access the Chart.js instance using `@ViewChild`:

```typescript
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from '@solidexpert/ngx-charts';

export class ChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public exportChart(): void {
    const imageUrl = this.chart?.toBase64Image();
    // Use the image URL
  }

  public updateChart(): void {
    this.chart?.update();
  }
}
```

## Dynamic Theming

The `ThemeService` allows you to dynamically change chart colors based on your application theme:

```typescript
import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '@solidexpert/ngx-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-root',
  template: `
    <mat-slide-toggle [(ngModel)]="isDarkTheme" (ngModelChange)="themeChanged()">
      Dark Theme
    </mat-slide-toggle>
  `,
})
export class AppComponent {
  public isDarkTheme = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private themeService: ThemeService,
  ) {}

  public themeChanged(): void {
    this.renderer.removeClass(this.document.body, 'dark-theme');

    let overrides: ChartOptions;

    if (this.isDarkTheme) {
      this.renderer.addClass(this.document.body, 'dark-theme');

      overrides = {
        scales: {
          x: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' },
          },
          y: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' },
          },
        },
        plugins: {
          legend: {
            labels: { color: 'white' },
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
}
```

## Colors

By default, the library uses Chart.js default color palette. You can customize colors through:

- Dataset options (per-dataset colors)
- Global chart defaults
- ThemeService for dynamic theming

See [Chart.js colors documentation](https://www.chartjs.org/docs/latest/general/colors.html) for more details.

## Development

### Building the Library

```bash
npm run build:lib
```

### Running the Demo Locally

See the [Usage & Demo](#usage--demo) section above for information about the live demo page.

To run the demo locally for development:

```bash
npm start
```

The demo application will be available at `http://localhost:4200`

> **Note**: The demo is automatically deployed to GitHub Pages at [https://solidexpert-ltd.github.io/ngx-charts/](https://solidexpert-ltd.github.io/ngx-charts/) on every push to the `main` branch.

### Building for Production

```bash
npm run build:prod
```

## Publishing

### NPM Package

The library is automatically published to npm via GitHub Actions when code is pushed to the `main` branch. The package version follows the format: `{angular-version}.0.{build-number}` (e.g., `19.0.123`).

### Demo Page

The demo application is automatically deployed to GitHub Pages at [https://solidexpert-ltd.github.io/ngx-charts/](https://solidexpert-ltd.github.io/ngx-charts/) on every push to the `main` branch via GitHub Actions.

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Charts not rendering**: Ensure Chart.js is installed and `provideCharts()` is configured
2. **Type errors**: Make sure you're using compatible versions of Angular and the library
3. **Styling issues**: Check that Chart.js styles are imported if needed

### Getting Help

- Check [GitHub Issues](https://github.com/solidexpert-ltd/ngx-charts/issues) for known problems
- Create a new issue with:
  - Angular version
  - Library version
  - Chart.js version
  - Steps to reproduce
  - Expected vs actual behavior

## License

The MIT License (see the [LICENSE](LICENSE) file for the full text)

## Acknowledgments

- Built on top of [Chart.js](https://www.chartjs.org/)
- Inspired by the original ng2-charts project
