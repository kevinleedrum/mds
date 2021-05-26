# Typography

Documentation and examples around typography including headings, body text, lists and more.

## Headings

The headings in the MoxiWorks Design System comprise the `h1` through `h6` elements. The `h1` can become extra large with an `xl` utility class, and `h3` through `h6` can be given extra weight with an `emphasis` class.

### Examples

<div class="mds">
  <h1 class="xl">This is an Extra Large H1</h1>

```html
<h1 class="xl">This is an Extra Large H1</h1>
```

  <h1>This is an H1</h1>

```html
<h1>This is an H1</h1>
```

  <h2 style="border-bottom: 0;">This is an H2</h2>

```html
<h2>This is an H2</h2>
```

  <h3 class="emphasis">This is an H3 with emphasis</h3>

```html
<h3 class="emphasis">This is an H3 with emphasis</h3>
```

  <h3>This is an H3 without emphasis</h3>

```html
<h3>This is an H3 without emphasis</h3>
```

  <h4 class="emphasis">This is an H4 with emphasis</h4>

```html
<h4 class="emphasis">This is an H4</h4>
```

  <h4>This is an H4 without emphasis</h4>

```html
<h4>This is an H4 without emphasis</h4>
```

  <h5 class="emphasis">This is an H5 with emphasis</h5>

```html
<h5 class="emphasis">This is an H5 with emphasis</h5>
```

  <h5>This is an H5 without emphasis</h5>

```html
<h5>This is an H5 without emphasis</h5>
```

  <h6 class="emphasis">This is an H6 with emphasis</h6>

```html
<h6 class="emphasis">This is an H6 with emphasis</h6>
```

  <h6>This is an H6 without emphasis</h6>

```html
<h6>This is an H6 without emphasis</h6>
```

</div>

## Body Fonts & Font Size

In the Moxi Design System, the default body font size is **16px**. To achieve the base font simply add the `mds` class to your body tag or a containing div you desire the implementation.

```html
<body class="mds"></body>
```

After the default body class font size, there are five other classes which can be used to adjust if the design spec calls for it.

| Class       | Size            | Line-Height    | Letter-Spacing |
| ----------- | --------------- | -------------- | -------------- |
| `text-xxs`  | 10px (0.625rem) | 16px (1rem)    | 0.3px          |
| `text-xs`   | 12px (0.75rem)  | 16px (1rem)    | 0.4px          |
| `text-sm`   | 14px (0.875rem) | 20px (1.25rem) | 0.25px         |
| `text-base` | 16px (1rem)     | 24px (1.5rem)  | 0.15px         |
| `text-lg`   | 18px (1.125rem) | 24px (1.5rem)  | 0.5px          |
| `text-xl`   | 20px (1.25rem)  | 24px (1.5rem)  | 0.5px          |

### Examples

<!-- #region font-size -->
<div class="mds">
  <div class="bg-white p-16 mt-16 border rounded-lg">
    <p class="my-6 text-xxs">This is xx-small text.</p>
    <p class="my-6 text-xs">This is x-small text.</p>
    <p class="my-6 text-sm">This is small text.</p>
    <p class="my-6 text-base">This is base body text.</p>
    <p class="my-6 text-lg">This is large text.</p>
    <p class="my-6 text-xl">This is x-large text.</p>
  </div>
</div>
<!-- #endregion font-size -->

<<<@/vuepress/css-documentation/typography.md#font-size

## Subtitles

There are currently 5 subtitle variants available via special classes.

| Class       | Size            | Weight    | Line-Height    | Letter-Spacing |
| ----------- | --------------- | --------- | -------------- | -------------- |
| `subtitle1` | 16px (1rem)     | SemiBold  | 24px (1.5rem)  | 0.15px         |
| `subtitle2` | 14px (0.875rem) | SemiBold  | 20px (1.25rem) | 0.4px          |
| `subtitle3` | 14px (0.875rem) | ExtraBold | 20px (1.25rem) | 0.4px          |
| `subtitle4` | 12px (0.75rem)  | SemiBold  | 16px (1rem)    | 0.4px          |
| `subtitle5` | 10px (0.625rem) | Bold      | 16px (1rem)    | 0.3px          |

### Examples

<!-- #region subtitles -->
<div class="mds">
  <div class="bg-white p-16 mt-16 border rounded-lg">
    <p class="my-6 subtitle1">Subtitle 1</p>
    <p class="my-6 subtitle2">Subtitle 2</p>
    <p class="my-6 subtitle3">Subtitle 3</p>
    <p class="my-6 subtitle4">Subtitle 4</p>
    <p class="my-6 subtitle5">Subtitle 5</p>
  </div>
</div>
<!-- #endregion subtitles -->

<<<@/vuepress/css-documentation/typography.md#subtitles

## Captions

| Class      | Size            | Line-Height | Letter-Spacing |
| ---------- | --------------- | ----------- | -------------- |
| `caption1` | 12px (0.75rem)  | 16px (1rem) | 0.3px          |
| `caption2` | 10px (0.625rem) | 16px (1rem) | 0.3px          |

### Examples

<!-- #region captions -->
<div class="mds">
  <div class="bg-white p-16 mt-16 border rounded-lg">
    <p class="my-6 caption1">Caption 1</p>
    <p class="my-6 caption2">Caption 2</p>
  </div>
</div>
<!-- #endregion captions -->

<<<@/vuepress/css-documentation/typography.md#captions

## Overlines

| Class       | Size            | Weight              | Line-Height   | Letter-Spacing |
| ----------- | --------------- | ------------------- | ------------- | -------------- |
| `overline1` | 18px (1.125rem) | SemiBold, Uppercase | 24px (1.5rem) | 1.5px          |
| `overline2` | 12px (0.75rem)  | Regular, Uppercase  | 16px (1rem)   | 1.5px          |

### Examples

<!-- #region overlines -->
<div class="mds">
  <div class="bg-white p-16 mt-16 border rounded-lg">
    <p class="my-6 overline1">Overline 1</p>
    <p class="my-6 overline2">Overline 2</p>
  </div>
</div>
<!-- #endregion overlines -->

<<<@/vuepress/css-documentation/typography.md#overlines

## Font Style

| Class        | Properties            |
| ------------ | --------------------- |
| `italic`     | `font-style: italic;` |
| `not-italic` | `font-style: normal;` |

## Font Weight

| Class             | Properties          |
| ----------------- | ------------------- |
| `font-thin`       | `font-weight: 100;` |
| `font-extralight` | `font-weight: 200;` |
| `font-light`      | `font-weight: 300;` |
| `font-normal`     | `font-weight: 400;` |
| `font-medium`     | `font-weight: 500;` |
| `font-semibold`   | `font-weight: 600;` |
| `font-bold`       | `font-weight: 700;` |
| `font-extrabold`  | `font-weight: 800;` |
| `font-black`      | `font-weight: 900;` |

## Font Variant Numeric

| Class                | Properties                                  |
| -------------------- | ------------------------------------------- |
| `normal-nums`        | `font-variant-numeric: normal;`             |
| `ordinal`            | `font-variant-numeric: ordinal;`            |
| `slashed-zero`       | `font-variant-numeric: slashed-zero;`       |
| `lining-nums`        | `font-variant-numeric: lining-nums;`        |
| `oldstyle-nums`      | `font-variant-numeric: oldstyle-nums;`      |
| `proportional-nums`  | `font-variant-numeric: proportional-nums;`  |
| `tabular-nums`       | `font-variant-numeric: tabular-nums;`       |
| `diagonal-fractions` | `font-variant-numeric: diagonal-fractions;` |
| `stacked-fractions`  | `font-variant-numeric: stacked-fractions;`  |

## Letter Spacing

| Class           | Properties                  |
| --------------- | --------------------------- |
| `tracking-0`    | `letter-spacing: 0rem`;     |
| `tracking-0-1`  | `letter-spacing: 0.006rem;` |
| `tracking-0-15` | `letter-spacing: 0.009rem;` |
| `tracking-0-25` | `letter-spacing: 0.016rem;` |
| `tracking-0-3`  | `letter-spacing: 0.019rem;` |
| `tracking-0-4`  | `letter-spacing: 0.025;`    |
| `tracking-0-5`  | `letter-spacing: 0.031rem;` |
| `tracking-1-25` | `letter-spacing: 0.078rem;` |
| `tracking-1-5`  | `letter-spacing: 0.094rem;` |

## Line Height

| Class             | Properties              |
| ----------------- | ----------------------- |
| `leading-3`       | `line-height: .75rem;`  |
| `leading-4`       | `line-height: 1rem;`    |
| `leading-5`       | `line-height: 1.25rem;` |
| `leading-6`       | `line-height: 1.5rem;`  |
| `leading-7`       | `line-height: 1.75rem;` |
| `leading-8`       | `line-height: 2rem;`    |
| `leading-9`       | `line-height: 2.25rem;` |
| `leading-10`      | `line-height: 2.5rem;`  |
| `leading-none`    | `line-height: 1;`       |
| `leading-tight`   | `line-height: 1.25;`    |
| `leading-snug`    | `line-height: 1.375;`   |
| `leading-normal`  | `line-height: 1.5;`     |
| `leading-relaxed` | `line-height: 1.625;`   |
| `leading-loose`   | `line-height: 2;`       |

## List Style Type

| Class          | Properties                  |
| -------------- | --------------------------- |
| `list-none`    | `list-style-type: none;`    |
| `list-disc`    | `list-style-type: disc;`    |
| `list-decimal` | `list-style-type: decimal;` |

## List Style Position

| Class          | Properties                      |
| -------------- | ------------------------------- |
| `list-inside`  | `list-style-position: inside;`  |
| `list-outside` | `list-style-position: outside;` |

## Text Alignment

| Class          | Properties             |
| -------------- | ---------------------- |
| `text-left`    | `text-align: left;`    |
| `text-center`  | `text-align: center;`  |
| `text-right`   | `text-align: right;`   |
| `text-justify` | `text-align: justify;` |

## Text Opacity

| Class              | Properties                 |
| ------------------ | -------------------------- |
| `text-opacity-0`   | `--tw-text-opacity: 0;`    |
| `text-opacity-5`   | `--tw-text-opacity: 0.05;` |
| `text-opacity-10`  | `--tw-text-opacity: 0.1;`  |
| `text-opacity-20`  | `--tw-text-opacity: 0.2;`  |
| `text-opacity-25`  | `--tw-text-opacity: 0.25;` |
| `text-opacity-30`  | `--tw-text-opacity: 0.3;`  |
| `text-opacity-40`  | `--tw-text-opacity: 0.4;`  |
| `text-opacity-50`  | `--tw-text-opacity: 0.5;`  |
| `text-opacity-60`  | `--tw-text-opacity: 0.6;`  |
| `text-opacity-70`  | `--tw-text-opacity: 0.7;`  |
| `text-opacity-75`  | `--tw-text-opacity: 0.75;` |
| `text-opacity-80`  | `--tw-text-opacity: 0.8;`  |
| `text-opacity-90`  | `--tw-text-opacity: 0.9;`  |
| `text-opacity-95`  | `--tw-text-opacity: 0.95;` |
| `text-opacity-100` | `--tw-text-opacity: 1;`    |

## Text Decoration

| Class          | Properties                       |
| -------------- | -------------------------------- |
| `underline`    | `text-decoration: underline;`    |
| `line-through` | `text-decoration: line-through;` |
| `no-underline` | `text-decoration: none;`         |

## Text Transformation

| Class         | Properties                    |
| ------------- | ----------------------------- |
| `uppercase`   | `text-transform: uppercase;`  |
| `lowercase`   | `text-transform: lowercase;`  |
| `capitalize`  | `text-transform: capitalize;` |
| `normal-case` | `text-transform: none;`       |

## Text Overflow

| Class               | Properties                                                        |
| ------------------- | ----------------------------------------------------------------- |
| `truncate`          | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` |
| `overflow-ellipsis` | `text-overflow: ellipsis;`                                        |
| `overflow-clip`     | `text-overflow: clip;`                                            |

## Vertical Align

| Class               | Properties                     |
| ------------------- | ------------------------------ |
| `align-baseline`    | `vertical-align: baseline;`    |
| `align-top`         | `vertical-align: top;`         |
| `align-middle`      | `vertical-align: middle;`      |
| `align-bottom`      | `vertical-align: bottom;`      |
| `align-text-top`    | `vertical-align: text-top;`    |
| `align-text-bottom` | `vertical-align: text-bottom;` |

## Whitespace

| Class                 | Properties               |
| --------------------- | ------------------------ |
| `whitespace-normal`   | `white-space: normal;`   |
| `whitespace-nowrap`   | `white-space: nowrap;`   |
| `whitespace-pre`      | `white-space: pre;`      |
| `whitespace-pre-line` | `white-space: pre-line;` |
| `whitespace-pre-wrap` | `white-space: pre-wrap;` |

## Word Break

| Class          | Properties                                   |
| -------------- | -------------------------------------------- |
| `break-normal` | `overflow-wrap: normal; word-break: normal;` |
| `break-words`  | `overflow-wrap: break-word;`                 |
| `break-all`    | `word-break: break-all;`                     |
