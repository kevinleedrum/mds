# Grid System

Example of how the grid system works. The examples use rows, but they coould just as easily be interchanged or mixed with `.grid-rows-{n}`. For more information on rows and columns, visit [the grid definition](/css-documentation/grid/grid-template-columns.html).

<div class="mds">
  <div class="container">
    <h4 class="my-10">Non-Responsive Grid</h4>
    <div class="grid grid-flow-row grid-cols-3 gap-4 text-center">
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        1
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        2
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        3
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        4
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        5
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        6
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        7
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        8
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        9
      </div>
    </div>
  </div>
</div>

Below is the code example of the above non-responsive grid above.

```html
<div class="grid grid-flow-row grid-cols-3 gap-4 text-center">
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">1</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">2</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">3</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">4</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">5</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">6</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">7</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">8</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">9</div>
</div>
```

<div class="mds">
  <div class="container">
    <h4 class="my-10">Responsive Grid</h4>
    <div
      class="grid grid-flow-row grid-cols-1 gap-4 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12"
    >
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        1
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        2
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        3
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        4
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        5
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        6
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        7
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        8
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        9
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        10
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        11
      </div>
      <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">
        12
      </div>
    </div>
  </div>
</div>

Below is the code example of a responsive grid system. The grid system works in a "mobile first" paradigm. This means that the initial defenition is the base behavior for the grid. In this instance that base bahavior is `grid-cols-1` or one column grid by default which will work on a phone. From there, you will define the column count using the responsive prefix of `sm:`, `md:`, `lg:`, `xl:` and `2xl` respectivly. This example goes from 1 column to 6 depending on the screen size.

```html
<div
  class="grid grid-flow-row grid-cols-1 gap-4 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">1</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">2</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">3</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">4</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">5</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">6</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">7</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">8</div>
  <div class="rounded py-4 text-center bg-primary-bg-dark text-primary-text-light">9</div>
</div>
```

### Example of a 2 column grid system with responsive

<div class="mds">
  <div class="mt-56 grid grid-cols-1 gap-0 sm:grid-cols-5 sm:gap-56">
    <div class="col-span-2 py-56 border-b-2 mb-56 text-center border-primary-bg-dark sm:border-2 sm:p-56 sm:rounded">
      Something Here
    </div>
    <div class="col-span-3">
      <h2 class="mt-2">Another Thing</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
    </div>
  </div>
</div>

```html
<div class="mds">
  <div class="mt-56 grid grid-cols-1 gap-0 sm:grid-cols-5 sm:gap-56">
    <div class="col-span-2 py-56 border-b-2 mb-56 text-center border-primary-bg-dark sm:border-2 sm:p-56 sm:rounded">
      Something Here
    </div>
    <div class="col-span-3">
      <h2 class="mt-2">Another Thing</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
        dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce
        nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
    </div>
  </div>
</div>
```
