# Hover, Focus & Other States

Similar to how Tailwind handles responsive design, styling elements on hover, focus, and more can be accomplished by prefixing utilities with the appropriate state variant.

```html purple
<template preview>
  <form class="flex w-full max-w-sm mx-auto space-x-3">
    <input
      class="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      type="email"
      placeholder="Your email"
    />
    <button
      class="flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
      type="button"
    >
      Sign up
    </button>
  </form>
</template>

<form>
  <input
    class="border border-transparent **focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent** ..."
  />
  <button
    class="bg-purple-600 **hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50** ..."
  >
    Sign up
  </button>
</form>
```

**Not all state variants are enabled for all utilities by default due to file-size considerations**, but we've tried our best to enable the most commonly used combinations out of the box.

For a complete list of which variants are enabled by default, see the [reference table](#default-variants-reference) at the end of this page.

## Hover

Add the `hover:` prefix to only apply a utility on hover.

```html rose
<template preview>
  <div class="text-center">
    <button
      type="button"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
      tabindex="-1"
    >
      Hover me
    </button>
  </div>
</template>

<button class="bg-red-500 **hover:bg-red-700** ...">
  Hover me
</button>
```

## Focus

Add the `focus:` prefix to only apply a utility on focus.

```html lightBlue
<template preview>
  <div class="max-w-xs w-full mx-auto">
    <input
      class="py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      placeholder="Focus me"
    />
  </div>
</template>

<input class="**focus:ring-2 focus:ring-blue-600** ..." />
```

## Active

Add the `active:` prefix to only apply a utility when an element is active.

```html emerald
<template preview>
  <div class="text-center">
    <button
      type="button"
      class="py-2 px-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-md active:bg-emerald-700 focus:outline-none"
      tabindex="-1"
    >
      Click me
    </button>
  </div>
</template>

<button class="bg-green-500 **active:bg-green-700** ...">
  Click me
</button>
```

## Group-hover

If you need to style a child element when hovering over a specific parent element, add the `group` class to the parent element and add the `group-hover:` prefix to the utility on the child element.

```html indigo
<template preview>
  <div
    class="group px-6 py-5 max-w-full mx-auto w-72 border border-indigo-500 border-opacity-25 cursor-pointer rounded-lg select-none overflow-hidden space-y-1 hover:bg-white hover:shadow-lg hover:border-transparent"
  >
    <p class="font-semibold text-lg text-indigo-600 group-hover:text-gray-900">New Project</p>
    <p class="text-indigo-500 group-hover:text-gray-500">Create a new project from a variety of starting templates.</p>
  </div>
</template>

<div class="**group** border-indigo-500 hover:bg-white hover:shadow-lg hover:border-transparent ...">
  <p class="text-indigo-600 **group-hover:text-gray-900** ...">New Project</p>
  <p class="text-indigo-500 **group-hover:text-gray-500** ...">
    Create a new project from a variety of starting templates.
  </p>
</div>
```

## Group-focus

The `group-focus` variant works just like [`group-hover`](#group-hover) except for focus:

```html amber
<template preview>
  <div class="text-center">
    <button
      type="button"
      class="group inline-flex items-center py-2 px-4 bg-amber-500 text-white font-semibold rounded-lg shadow-md focus:bg-amber-600 focus:outline-none"
    >
      <svg fill="currentColor" viewBox="0 0 20 20" class="-ml-1 mr-3 w-5 h-5 text-white group-focus:text-amber-300">
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
      </svg>
      Bookmark
    </button>
  </div>
</template>

<button class="**group** bg-yellow-500 focus:bg-yellow-600 ...">
  <svg class="text-white **group-focus:text-yellow-300** ..."></svg>
  Bookmark
</button>
```

## Focus-within

Add the `focus-within:` prefix to only apply a utility when a child element has focus.

```html purple
<template preview>
  <form class="w-full max-w-sm mx-auto">
    <div class="relative text-gray-400 focus-within:text-gray-600">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      </div>
      <input
        id="email"
        class="py-3 px-4 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none w-full block pl-12 focus:outline-none"
        placeholder="you@example.com"
      />
    </div>
  </form>
</template>

<form>
  <div class="text-gray-400 **focus-within:text-gray-600** ...">
    <div class="...">
      <svg fill="currentColor"></svg>
    </div>
    <input class="focus:ring-2 focus:ring-gray-300 ..." />
  </div>
</form>
```

## Focus-visible

Note that focus-visible currently requires JS and PostCSS polyfills for sufficient browser support.

Add the `focus-visible:` prefix to only apply a utility when an element has focus but only if the user is using the keyboard.

```html rose
<template preview>
  <div class="flex justify-center space-x-8">
    <button
      type="button"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-opacity-75"
    >
      Ring on focus
    </button>
    <button
      type="button"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-opacity-75"
    >
      Ring on focus-visible
    </button>
  </div>
</template>

<button class="**focus:ring-2 focus:ring-red-500** ...">
  Ring on focus
</button>
<button class="**focus-visible:ring-2 focus-visible:ring-rose-500** ...">
  Ring on focus-visible
</button>
```

## Motion-safe

Add the `motion-safe:` prefix to only apply a utility when the `prefers-reduced-motion` media feature matches `no-preference`.

For example, this button will only animate on hover if the user hasn't enabled "Reduce motion" on their system.

```html lightBlue
<template preview>
  <div class="text-center">
    <button
      type="button"
      class="py-2 px-4 bg-light-blue-500 text-white font-semibold rounded-lg shadow-md transform transition motion-safe:hover:scale-110 duration-500 focus:outline-none"
      tabindex="-1"
    >
      Hover me
    </button>
  </div>
</template>

<button class="transform **motion-safe:hover:scale-110** ...">
  Hover me
</button>
```

## Motion-reduce

Add the `motion-reduce:` prefix to only apply a utility when the `prefers-reduced-motion` media feature matches `reduce`.

For example, this button will animate on hover by default, but the animations will be disabled if the user has enabled "Reduce motion" on their system.

```html fuchsia
<template preview>
  <div class="text-center">
    <button
      type="button"
      class="py-2 px-4 bg-fuchsia-500 text-white font-semibold rounded-lg shadow-md transform transition motion-reduce:transform-none hover:scale-110 duration-500 focus:outline-none"
      tabindex="-1"
    >
      Hover me
    </button>
  </div>
</template>

<button class="transform hover:scale-110 **motion-reduce:transform-none** ...">
  Hover me
</button>
```

Note that unlike most other variants, `motion-reduce` can be combined with both responsive variants _and_ other variants like `hover`, by stacking them in this order:

```html
<div class="**sm:motion-reduce:hover:animate-none**">
  <!-- ... -->
</div>
```

## Disabled

Add the `disabled:` prefix to only apply a utility when an element is disabled.

```html emerald
<template preview>
  <div class="text-center space-x-8">
    <button
      type="button"
      class="py-2 px-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none disabled:opacity-50"
      tabindex="-1"
    >
      Submit
    </button>
    <button
      type="button"
      class="py-2 px-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-md disabled:opacity-50"
      disabled
      tabindex="-1"
    >
      Submit
    </button>
  </div>
</template>

<button class="**disabled:opacity-50** ...">
  Submit
</button>
<button class="**disabled:opacity-50** ..." disabled>
  Submit
</button>
```

## Visited

Add the `visited:` prefix to only apply a utility when a link has been visited.

```html indigo
<template preview>
  <div class="text-center space-x-16">
    <a href="#" class="font-semibold text-blue-600 ">Unvisited link</a>
    <a href="#" class="font-semibold text-purple-600 ">Visited link</a>
  </div>
</template>

<a href="#" class="text-blue-600 **visited:text-purple-600** ...">Link</a>
```

## Checked

Add the `checked:` prefix to only apply a utility when a radio or checkbox is currently checked.

```html lightBlue
<template preview>
  <div class="p-4 max-w-xs mx-auto bg-white rounded-xl shadow-md">
    <label class="flex items-center space-x-3">
      <input
        type="checkbox"
        name="checked-demo"
        value="1"
        class="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
      />
      <span class="text-gray-900 font-medium">Option 1</span>
    </label>
  </div>
</template>

<input type="checkbox" class="appearance-none **checked:bg-blue-600 checked:border-transparent** ..." />
```

## First-child

Add the `first:` prefix to only apply a utility when it is the first-child of its parent. This is mostly useful when elements are being generated in some kind of loop.

```html indigo
<template preview>
  <div class="flex justify-around">
    <div class="bg-indigo-500 rounded-md p-8 transform first:rotate-45"></div>
    <div class="bg-indigo-500 rounded-md p-8 transform first:rotate-45"></div>
    <div class="bg-indigo-500 rounded-md p-8 transform first:rotate-45"></div>
    <div class="bg-indigo-500 rounded-md p-8 transform first:rotate-45"></div>
  </div>
</template>

<div class="...">
  <div v-for="item in items" class="transform **first:rotate-45** ...">
    {{ item }}
  </div>
</div>
```

## Last-child

Add the `last:` prefix to only apply a utility when it is the last-child of its parent. This is mostly useful when elements are being generated in some kind of loop.

```html amber
<template preview>
  <div class="flex justify-around">
    <div class="bg-amber-500 rounded-md p-8 transform last:rotate-45"></div>
    <div class="bg-amber-500 rounded-md p-8 transform last:rotate-45"></div>
    <div class="bg-amber-500 rounded-md p-8 transform last:rotate-45"></div>
    <div class="bg-amber-500 rounded-md p-8 transform last:rotate-45"></div>
  </div>
</template>

<div class="...">
  <div v-for="item in items" class="transform **last:rotate-45** ...">
    {{ item }}
  </div>
</div>
```

## Odd-child

Add the `odd:` prefix to only apply a utility when it is an odd-child of its parent. This is mostly useful when elements are being generated in some kind of loop.

```html rose
<template preview>
  <div class="flex justify-around">
    <div class="bg-rose-500 rounded-md p-8 transform odd:rotate-45"></div>
    <div class="bg-rose-500 rounded-md p-8 transform odd:rotate-45"></div>
    <div class="bg-rose-500 rounded-md p-8 transform odd:rotate-45"></div>
    <div class="bg-rose-500 rounded-md p-8 transform odd:rotate-45"></div>
  </div>
</template>

<div class="...">
  <div v-for="item in items" class="transform **odd:rotate-45** ...">
    {{ item }}
  </div>
</div>
```

## Even-child

Add the `even:` prefix to only apply a utility when it is an even-child of its parent. This is mostly useful when elements are being generated in some kind of loop.

```html fuchsia
<template preview>
  <div class="flex justify-around">
    <div class="bg-fuchsia-500 rounded-md p-8 transform even:rotate-45"></div>
    <div class="bg-fuchsia-500 rounded-md p-8 transform even:rotate-45"></div>
    <div class="bg-fuchsia-500 rounded-md p-8 transform even:rotate-45"></div>
    <div class="bg-fuchsia-500 rounded-md p-8 transform even:rotate-45"></div>
  </div>
</template>

<div class="...">
  <div v-for="item in items" class="transform **even:rotate-45** ...">
    {{ item }}
  </div>
</div>
```

## Combining with responsive prefixes

State variants are also responsive, meaning you can do things like change an element's hover style at different breakpoints for example.

To apply a state variant at a specific breakpoint, add the responsive prefix first, before the state prefix:

```html
<button class="... hover:bg-green-500 **sm:hover:bg-blue-500**">
  <!-- ... -->
</button>
```
