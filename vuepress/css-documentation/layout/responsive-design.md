# Responsive Design

Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.

There are five breakpoints by default, inspired by common device resolutions:

| Breakpoint prefix | Minimum width | CSS                                  |
| ----------------- | ------------- | ------------------------------------ |
| `sm`              | 640px         | `@media (min-width: 640px) { ... }`  |
| `md`              | 768px         | `@media (min-width: 768px) { ... }`  |
| `lg`              | 1024px        | `@media (min-width: 1024px) { ... }` |
| `xl`              | 1280px        | `@media (min-width: 1280px) { ... }` |
| `2xl`             | 1536px        | `@media (min-width: 1536px) { ... }` |

To add a utility but only have it take effect at a certain breakpoint, all you need to do is prefix the utility with the breakpoint name, followed by the `:` character:

```html
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 **md:w-32** **lg:w-48**" src="..." />
```

This works for **every utility class in the framework**, which means you can change literally anything at a given breakpoint — even things like letter spacing or cursor styles.

## Mobile First

By default, Tailwind uses a mobile first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.

What this means is that unprefixed utilities (like `uppercase`) take effect on all screen sizes, while prefixed utilities (like `md:uppercase`) only take effect at the specified breakpoint _and above_.

### Targeting mobile screens

Where this approach surprises people most often is that to style something for mobile, you need to use the unprefixed version of a utility, not the `sm:` prefixed version. Don't think of `sm:` as meaning "on small screens", think of it as "at the small _breakpoint_".

Don't use <code className="text-sm font-bold text-gray-800">sm:</code> to target mobile devices

```html
<!-- This will only center text on screens 640px and wider, not on small screens -->
<div class="sm:text-center"></div>
```

Use unprefixed utilities to target mobile, and override them at larger breakpoints

```html
<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>
```

For this reason, it's often a good idea to implement the mobile layout for a design first, then layer on any changes that make sense for `sm` screens, followed by `md` screens, etc.

### Targeting a single breakpoint

Tailwind's breakpoints only include a `min-width` and don't include a `max-width`, which means any utilities you add at a smaller breakpoint will also be applied at larger breakpoints.

If you'd like to apply a utility at one breakpoint only, the solution is to _undo_ that utility at larger sizes by adding another utility that counteracts it.

Here is an example where the background color is red at the `md` breakpoint, but teal at every other breakpoint:

```html
<div class="bg-teal-500 md:bg-red-500 lg:bg-teal-500">
  <!-- ... -->
</div>
```

Notice that **we did not** have to specify a background color for the `sm` breakpoint or the `xl` breakpoint — you only need to specify when a utility should _start_ taking effect, not when it should stop.
