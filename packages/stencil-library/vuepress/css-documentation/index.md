# CSS Documentation

Under the covers the Moxi Design System uses [TailwindCSS](https://tailwindcss.com/) to give us our base utility classes including paddings, margins, grid systems, etc.

## Rems Vs Pixels

We're defaulting to Rem values when defining font sizes, line-heights, etc. Why? Because accessibility is incredibly important as is respecting a users preferred settings on their browser. For the vision impared, using pixels less than ideal. Rems will scale appropriately based on the main body font size of 16px to the users preferred specifications.

If you need to convert a pixel value to a rem value you can use this utility [https://nekocalc.com/px-to-rem-converter](https://nekocalc.com/px-to-rem-converter)
