# Container

<table class="w-full text-left border-collapse"><colgroup><col class="w-1/4"><col class="w-1/4"><col class="w-1/2"></colgroup><thead><tr><th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0"><div class="pb-2 border-b border-gray-200">Class</div></th><th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0"><div class="pb-2 border-b border-gray-200">Breakpoint</div></th><th class="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0"><div class="pb-2 border-b border-gray-200">Properties</div></th></tr></thead><tbody class="align-baseline"><tr><td rowspan="6" class="py-2 font-mono text-xs text-violet-600 whitespace-nowrap">container</td><td class="py-2 text-xs italic">None</td><td class="py-2 font-mono text-xs text-light-blue-600 whitespace-pre">width: 100%;</td></tr><tr><td class="py-2 border-t border-gray-200 font-mono text-xs">sm <span class="font-sans italic">(640px)</span></td><td class="py-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">max-width: 640px;</td></tr><tr><td class="py-2 border-t border-gray-200 font-mono text-xs">md <span class="font-sans italic">(768px)</span></td><td class="py-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">max-width: 768px;</td></tr><tr><td class="py-2 border-t border-gray-200 font-mono text-xs">lg <span class="font-sans italic">(1024px)</span></td><td class="py-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">max-width: 1024px;</td></tr><tr><td class="py-2 border-t border-gray-200 font-mono text-xs">xl <span class="font-sans italic">(1280px)</span></td><td class="py-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">max-width: 1280px;</td></tr><tr><td class="py-2 border-t border-gray-200 font-mono text-xs">2xl <span class="font-sans italic">(1536px)</span></td><td class="py-2 font-mono text-xs text-light-blue-600 whitespace-pre border-t border-gray-200">max-width: 1536px;</td></tr></tbody></table>

## Usage

The `container` class sets the `max-width` of an element to match the `min-width` of the current breakpoint. This is useful if you'd prefer to design for a fixed set of screen sizes instead of trying to accommodate a fully fluid viewport.

Note that unlike containers you might have used in other frameworks, **Tailwind's container does not center itself automatically and does not have any built-in horizontal padding.**

To center a container, use the `mx-auto` utility:

```html
<div class="container **mx-auto**">
  <!-- ... -->
</div>
```

To add horizontal padding, use the `px-{size}` utilities:

```html
<div class="container mx-auto **px-4**">
  <!-- ... -->
</div>
```

If you'd like to center your containers by default or include default horizontal padding, see the [customization options](#customizing) below.

## Responsive variants

The `container` class also includes responsive variants like `md:container` by default that allow you to make something behave like a container at only a certain breakpoint and up:

```html
<!-- Full-width fluid until the `md` breakpoint, then lock to container -->
<div class="**md:container md:mx-auto**">
  <!-- ... -->
</div>
```
