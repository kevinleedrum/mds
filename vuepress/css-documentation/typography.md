# Typography

Documentation and examples around typography including headings, body text, lists and more.

## Headings

Heading examples for the Moxi Design System.

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
<h3 class="emphasis">This is an H3</h3>
```

  <h3>This is an H3</h3>

```html
<h3>This is an H3 Without Bold</h3>
```

  <h4 class="emphasis">This is an H4 with emphasis</h4>

```html
<h4 class="emphasis">This is an H4</h4>
```

  <h4>This is an H4</h4>

```html
<h4>This is an H4 Without Bold</h4>
```

  <h5 class="emphasis">This is an H5 with emphasis</h5>

```html
<h5 class="emphasis">This is an H5 with emphasis</h5>
```

  <h5>This is an H5</h5>

```html
<h5>This is an H5 Without Bold</h5>
```

  <h6 class="emphasis">This is an H6 with emphasis</h6>

```html
<h6 class="emphasis">This is an H6</h6>
```

  <h6>This is an H6 Without Bold</h6>

```html
<h6>This is an H6 Without Bold</h6>
```

</div>

## Body Fonts & Font Size

In the moxi design system, the default body font size is 16px. To achieve the base font simply add the `mds` class to your body tag or a containing div you desire the implementation.

```html
<body class="mds"></body>
```

After the default body class font size, there are three other classes which can be used to adjust if the design spec calls for it.

| Class      | Description                 |
| ---------- | --------------------------- |
| .text-xxs  | 10px or 0.625rem font size  |
| .text-xs   | 12px or 0.75rem font size.  |
| .text-sm   | 14px or 0.875rem font size. |
| .text-base | 16px or 1 rem font size.    |
| .text-lg   | 18px or 1.125rem font size. |
| .text-xl   | 24px or 1.25rem font size.  |

## Font Style

| Class      | Properties          |
| ---------- | ------------------- |
| italic     | font-style: italic; |
| not-italic | font-style: normal; |

## Font Weight

| Class           | Properties        |
| --------------- | ----------------- |
| font-thin       | font-weight: 100; |
| font-extralight | font-weight: 200; |
| font-light      | font-weight: 300; |
| font-normal     | font-weight: 400; |
| font-medium     | font-weight: 500; |
| font-semibold   | font-weight: 600; |
| font-bold       | font-weight: 700; |
| font-extrabold  | font-weight: 800; |
| font-black      | font-weight: 900; |

## Font Variant Numeric

| Class              | Properties                                |
| ------------------ | ----------------------------------------- |
| normal-nums        | font-variant-numeric: normal;             |
| ordinal            | font-variant-numeric: ordinal;            |
| slashed-zero       | font-variant-numeric: slashed-zero;       |
| lining-nums        | font-variant-numeric: lining-nums;        |
| oldstyle-nums      | font-variant-numeric: oldstyle-nums;      |
| proportional-nums  | font-variant-numeric: proportional-nums;  |
| tabular-nums       | font-variant-numeric: tabular-nums;       |
| diagonal-fractions | font-variant-numeric: diagonal-fractions; |
| stacked-fractions  | font-variant-numeric: stacked-fractions;  |

## Letter Spacing

| Class            | Properties |
| ---------------- | ---------- |
| tracking-neg-1-5 | -0.094rem  |
| tracking-neg-0-5 | -0.031rem  |
| tracking-0       | 0rem       |
| tracking-0-1     | 0.006rem   |
| tracking-0-15    | 0.009rem   |
| tracking-0-25    | 0.016rem   |
| tracking-0-3     | 0.019rem   |
| tracking-0-4     | 0.025,     |
| tracking-0-5     | 0.031rem   |
| tracking-1-25    | 0.078rem   |
| tracking-1-5     | 0.094rem   |

<div class="mds">
  <p class="tracking-1-5">Hello</p>
</div>

## Line Height

| Class           | Properties            |
| --------------- | --------------------- |
| leading-3       | line-height: .75rem;  |
| leading-4       | line-height: 1rem;    |
| leading-5       | line-height: 1.25rem; |
| leading-6       | line-height: 1.5rem;  |
| leading-7       | line-height: 1.75rem; |
| leading-8       | line-height: 2rem;    |
| leading-9       | line-height: 2.25rem; |
| leading-10      | line-height: 2.5rem;  |
| leading-none    | line-height: 1;       |
| leading-tight   | line-height: 1.25;    |
| leading-snug    | line-height: 1.375;   |
| leading-normal  | line-height: 1.5;     |
| leading-relaxed | line-height: 1.625;   |
| leading-loose   | line-height: 2;       |

## List Style Type

| Class        | Properties                |
| ------------ | ------------------------- |
| list-none    | list-style-type: none;    |
| list-disc    | list-style-type: disc;    |
| list-decimal | list-style-type: decimal; |

## List Style Position

| Class        | Properties                    |
| ------------ | ----------------------------- |
| list-inside  | list-style-position: inside;  |
| list-outside | list-style-position: outside; |

## Text Alignment

| Class        | Properties           |
| ------------ | -------------------- |
| text-left    | text-align: left;    |
| text-center  | text-align: center;  |
| text-right   | text-align: right;   |
| text-justify | text-align: justify; |

## Text Opacity

| Class            | Properties               |
| ---------------- | ------------------------ |
| text-opacity-0   | --tw-text-opacity: 0;    |
| text-opacity-5   | --tw-text-opacity: 0.05; |
| text-opacity-10  | --tw-text-opacity: 0.1;  |
| text-opacity-20  | --tw-text-opacity: 0.2;  |
| text-opacity-25  | --tw-text-opacity: 0.25; |
| text-opacity-30  | --tw-text-opacity: 0.3;  |
| text-opacity-40  | --tw-text-opacity: 0.4;  |
| text-opacity-50  | --tw-text-opacity: 0.5;  |
| text-opacity-60  | --tw-text-opacity: 0.6;  |
| text-opacity-70  | --tw-text-opacity: 0.7;  |
| text-opacity-75  | --tw-text-opacity: 0.75; |
| text-opacity-80  | --tw-text-opacity: 0.8;  |
| text-opacity-90  | --tw-text-opacity: 0.9;  |
| text-opacity-95  | --tw-text-opacity: 0.95; |
| text-opacity-100 | --tw-text-opacity: 1;    |

## Text Decoration

| Class        | Properties                     |
| ------------ | ------------------------------ |
| underline    | text-decoration: underline;    |
| line-through | text-decoration: line-through; |
| no-underline | text-decoration: none;         |

## Text Transformation

| Class       | Properties                  |
| ----------- | --------------------------- |
| uppercase   | text-transform: uppercase;  |
| lowercase   | text-transform: lowercase;  |
| capitalize  | text-transform: capitalize; |
| normal-case | text-transform: none;       |

## Text Overflow

| Class             | Properties                                                      |
| ----------------- | --------------------------------------------------------------- |
| truncate          | overflow: hidden; text-overflow: ellipsis; white-space: nowrap; |
| overflow-ellipsis | text-overflow: ellipsis;                                        |
| overflow-clip     | text-overflow: clip;                                            |

## Vertical Align

| Class             | Properties                   |
| ----------------- | ---------------------------- |
| align-baseline    | vertical-align: baseline;    |
| align-top         | vertical-align: top;         |
| align-middle      | vertical-align: middle;      |
| align-bottom      | vertical-align: bottom;      |
| align-text-top    | vertical-align: text-top;    |
| align-text-bottom | vertical-align: text-bottom; |

## Whitespace

| Class               | Properties             |
| ------------------- | ---------------------- |
| whitespace-normal   | white-space: normal;   |
| whitespace-nowrap   | white-space: nowrap;   |
| whitespace-pre      | white-space: pre;      |
| whitespace-pre-line | white-space: pre-line; |
| whitespace-pre-wrap | white-space: pre-wrap; |

## Word Break

| Class        | Properties                                 |
| ------------ | ------------------------------------------ |
| break-normal | overflow-wrap: normal; word-break: normal; |
| break-words  | overflow-wrap: break-word;                 |
| break-all    | word-break: break-all;                     |
