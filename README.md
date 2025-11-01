# chartjs-adapter-dayjs-plus

A Day.js-based time scale adapter for Chart.js 4.x.  
It activates the Day.js `utc`, `timezone`, `quarterOfYear`, `weekOfYear`, and `isoWeek` plugins, then overrides Chart.js' default `_date` adapter.

## Highlights
- Day.js adapter tailored for the Chart.js `time` scale
- `initialize` helper to override built-in formats as needed
- Automatically enables timezone, quarter, and week-related Day.js plugins
- Written in TypeScript for first-class type safety

## Installation

```bash
pnpm add chartjs-adapter-dayjs-plus
# or
npm install chartjs-adapter-dayjs-plus
yarn add chartjs-adapter-dayjs-plus
```

Chart.js and Day.js are bundled with the package, so the commands above are all you need.

## Quick Start

```ts
import { Chart } from "chart.js/auto";
import { initialize } from "chartjs-adapter-dayjs-plus";

// Initialize the adapter (once during app startup)
initialize();

const chart = new Chart(document.getElementById("chart") as HTMLCanvasElement, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Visitors",
        data: [
          { x: "2025-01-01T00:00:00Z", y: 120 },
          { x: "2025-01-02T00:00:00Z", y: 98 },
        ],
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "time",
        time: { unit: "day" },
      },
    },
  },
});
```

## Customizing Formats

`initialize` accepts a `Partial<AdapterOptions>`. Only the keys you provide will override the defaults.

```ts
initialize({
  datetime: "YYYY-MM-DD HH:mm:ss",
  week: "[W]WW YYYY",
});
```

Default formats:

```ts
{
  datetime: "MMM D, YYYY, h:mm:ss A",
  millisecond: "h:mm:ss.SSS A",
  second: "h:mm:ss A",
  minute: "h:mm A",
  hour: "hA",
  day: "MMM D",
  week: "l",
  month: "MMM YYYY",
  quarter: "[Q]Q - YYYY",
  year: "YYYY",
}
```

## Timezones & Localization

- Day.js timezone support is enabled automatically. Use `dayjs.tz.setDefault("Asia/Seoul")`, etc., to set a global timezone.
- The `weekOfYear`, `isoWeek`, and `quarterOfYear` plugins are active, so week- and quarter-based charts work out of the box.
- Adjust locales through Chart.js (`adapters.date.locale`) or Day.js (`dayjs.locale`) depending on your needs.

## Development & Build

Work on the package locally or inspect the build output with:

```bash
pnpm install        # install dependencies
pnpm dev            # run the Vite example app
pnpm build          # produce the bundle and .d.ts files under dist/
```

The build emits an ESM bundle and type declarations in `dist/`.

## License

MIT License (see the `license` field in `package.json`).
