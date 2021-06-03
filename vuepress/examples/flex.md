# Flexbox

Flexbox useage examples. For more information on the classes available for managing flex layouts [see the section on Flexbox classes](/css-documentation/flexbox/flex-direction.html). Also visit the section on box-alignment for more information on flexbox complimentary class definitions.

## Basic Flex Example

The below example uses a `.flex` container combined with `.space-x-{n}` or `space-between`. The interior elements use `.flex-1` to grow/shrink as neccessary and `.flex-none` to not grow or shrink the middle container.

<div class="mds">
  <div class="flex space-x-4">
    <div class="flex-1 rounded p-12 bg-primary-inverted text-primary-inverted">
      Item that can grow or shrink if needed
    </div>
    <div class="flex-none rounded p-12 bg-primary-inverted text-primary-inverted">
      Item that cannot grow or shrink
    </div>
    <div class="flex-1 rounded p-12 bg-primary-inverted text-primary-inverted">
      Item that can grow or shrink if needed
    </div>
  </div>
</div>

```html
<div class="flex space-x-4">
  <div class="flex-1 rounded p-12 bg-primary-inverted text-primary-inverted">
    Item that can grow or shrink if needed
  </div>
  <div class="flex-none rounded p-12 bg-primary-inverted text-primary-inverted">
    Item that cannot grow or shrink
  </div>
  <div class="flex-1 rounded p-12 bg-primary-inverted text-primary-inverted">
    Item that can grow or shrink if needed
  </div>
</div>
```

## Using Flex with Box Alignment

The below example uses `box-alignment` with flex for desired outputs. This is extreamly helpful in assuring items like icons line up properly with text or other elements.

<div class="mds">
  <div class="inline-flex flex-nowrap align-center items-center bg-gray p-3 rounded cursor-pointer space-x-2 hover:bg-gray-inverted">
    <i class="ph-file-text" style="font-size: 50px"></i>
    <div class="font-bold">Click Here to Copy File Contents</div>
  </div>
</div>

```html
<div
  class="inline-flex flex-nowrap align-center items-center bg-gray p-3 rounded cursor-pointer space-x-2 hover:bg-gray-inverted"
>
  <i class="ph-file-text" style="font-size: 50px"></i>
  <div class="font-bold">Click Here to Copy File Contents</div>
</div>
```
