# Typography

Documentation and examples around typography including headings, body text, lists and more.

## Headings

The headings in the MoxiWorks Design System comprise the `h1` through `h6` elements, as well as utility classes `text-h1` through `text-h3`. The `h3` can be given extra weight with an `emphasis` class.

| Selectors                           | Size            | Letter-Spacing | Line-Height   | Weight    |
| ----------------------------------- | --------------- | -------------- | ------------- | --------- |
| `h1` / `.text-h1`                   | 40px (2.5rem)   | 0              | 48px (3rem)   | 300       |
| `h2` / `.text-h2`                   | 24px (1.5rem)   | 0              | 24px (1.5rem) | 400       |
| `h3` / `.text-h3`                   | 16px (1.25rem)  | 0              | 20px (1.25rem)| 500       |
| `h3.emphasis` / `.text-h3.emphasis` | 16px (1.25rem)  | 0              | 20px (1.25rem)| 700       |

### Examples

<div class="mds">
  <h1>This is an H1.</h1>
  <p class="text-h1">This is styled as an H1.</p>

```html
<h1>This is an H1.</h1>
<p class="text-h1">This is styled as an H1.</p>
```

  <h2>This is an H2.</h2>
  <h2 class="text-h2">This is styled as an H2.</h2>

```html
<h2>This is an H2.</h2>
<h2 class="text-h2">This is styled as an H2.</h2>
```

  <h3>This is an H3.</h3>
  <p class="text-h3">This is styled as an H3.</p>

```html
<h3>This is an H3.</h3>
<p class="text-h3">This is styled as an H3.</p>
```

  <h3 class="emphasis">This is an H3 with emphasis.</h3>
  <p class="text-h3 emphasis">This is styled as an H3 with emphasis.</p>

```html
<h3 class="emphasis">This is an H3 with emphasis.</h3>
<p class="text-h3 emphasis">This is styled as an H3 with emphasis.</p>
```
</div>

## Body Fonts & Font Size

In the Moxi Design System, the default body font size is **14px**. To achieve the base font simply add the `mds` class to your body tag or a containing div you desire the implementation.

```html
<body class="mds"></body>
```

There are five utility classes for setting the body font size.

| Class            | Size            | Line-Height    | Letter-Spacing |
| ---------------- | --------------- | -------------- | -------------- |
| _body (default)_ | 14px (0.875rem) | 24px (1.5rem)  | 0              |
| `text-small`     | 12px (0.75rem)  | 14px (0.875rem)| 0              |
| `text-tooltip`   | 11px (0.75rem)  | 14px (0.875rem)| 0.1px          |
| `text-icon`      | 24px (1.5rem)   | inherit        | inherit        |

### Examples

<!-- #region font-size -->
<div class="mds">
  <div class="bg-white p-16 mt-16 border rounded-lg">
    <p class="my-6">This is default body text.</p>
    <p class="my-6 text-small">This is small.</p>
    <p class="my-6 text-tooltip">This is tooltip text.</p>
  </div>
</div>
<!-- #endregion font-size -->

<<<@/vuepress/css-documentation/typography.md#font-size


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
