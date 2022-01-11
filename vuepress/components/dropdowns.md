# Dropdowns

## Dropdown Menus

The Dropdown Menu (`mx-dropdown-menu`) component is suitable for making a single selection from a list of choices and is designed for UI purposes, such as filters. For traditional forms, see the [Select](#selects) component below.

The default appearance matches that of other input components. There are also `flat` and `elevated` style variants for use as filters, etc.

The options in the menu are represented by [Menu Items](/components/menus.html).

<!-- #region dropdown-menus -->
<section class="mds">
  <div class="grid lg:grid-cols-2 gap-36 mt-20">
    <div>
      <strong>Regular</strong>
      <div class="my-20">
        <mx-dropdown-menu
          label="Favorite Animal"
          :value="animal"
          @input="animal = $event.target.value"
        >
          <mx-menu-item></mx-menu-item>
          <mx-menu-item subtitle="Felis catus">Cat</mx-menu-item>
          <mx-menu-item subtitle="Canis familiaris">Dog</mx-menu-item>
          <mx-menu-item subtitle="Odobenus rosmarus">Walrus</mx-menu-item>
        </mx-dropdown-menu>
      </div>
    </div>
    <div>
      <strong>Dense</strong>
      <div class="my-10">
        <mx-dropdown-menu
          label="Favorite Animal"
          :value="animal"
          @input="animal = $event.target.value"
          dense
        >
          <mx-menu-item></mx-menu-item>
          <mx-menu-item>Cat</mx-menu-item>
          <mx-menu-item>Dog</mx-menu-item>
          <mx-menu-item>Walrus</mx-menu-item>
        </mx-dropdown-menu>
      </div>
    </div>
    <div>
      <strong>Regular with Suffix</strong>
      <div class="my-20">
        <mx-dropdown-menu
          label="Size of Home"
          :value="size"
          suffix="SQFT"
          @input="size = $event.target.value"
        >
          <mx-menu-item></mx-menu-item>
          <mx-menu-item>&lt; 1000</mx-menu-item>
          <mx-menu-item>1000-2000</mx-menu-item>
          <mx-menu-item>2001-3000</mx-menu-item>
          <mx-menu-item>3001-4000</mx-menu-item>
          <mx-menu-item>4000+</mx-menu-item>
        </mx-dropdown-menu>
      </div>
    </div>
    <div>
      <strong>Dense with Suffix</strong>
      <div class="my-10">
        <mx-dropdown-menu
          label="Size of Home"
          :value="size"
          suffix="SQFT"
          @input="size = $event.target.value"
          dense
        >
          <mx-menu-item></mx-menu-item>
          <mx-menu-item>&lt; 1000</mx-menu-item>
          <mx-menu-item>1000-2000</mx-menu-item>
          <mx-menu-item>2001-3000</mx-menu-item>
          <mx-menu-item>3001-4000</mx-menu-item>
          <mx-menu-item>4000+</mx-menu-item>
        </mx-dropdown-menu>
      </div>
    </div>
    <div>
      <strong>Elevated</strong>
      <div class="my-10">
        <mx-dropdown-menu
          label="Favorite Animal"
          :value="animal"
          @input="animal = $event.target.value"
          elevated
        >
          <mx-menu-item></mx-menu-item>
          <mx-menu-item>Cat</mx-menu-item>
          <mx-menu-item>Dog</mx-menu-item>
          <mx-menu-item>Walrus</mx-menu-item>
        </mx-dropdown-menu>
      </div>
    </div>
    <div>
      <strong>Dense Elevated</strong>
      <div class="my-10">
        <mx-dropdown-menu
          label="Favorite Animal"
          :value="animal"
          @input="animal = $event.target.value"
          dense
          elevated
        >
          <mx-menu-item></mx-menu-item>
          <mx-menu-item>Cat</mx-menu-item>
          <mx-menu-item>Dog</mx-menu-item>
          <mx-menu-item>Walrus</mx-menu-item>
        </mx-dropdown-menu>
      </div>
    </div>
    <div>
      <strong>Flat</strong>
      <div class="my-10">
        <mx-dropdown-menu
          label="Favorite Animal"
          :value="animal"
          @input="animal = $event.target.value"
          flat
        >
          <mx-menu-item></mx-menu-item>
          <mx-menu-item>Cat</mx-menu-item>
          <mx-menu-item>Dog</mx-menu-item>
          <mx-menu-item>Walrus</mx-menu-item>
        </mx-dropdown-menu>
      </div>
    </div>
    <div>
      <strong>Dense Flat</strong>
      <div class="my-10">
        <mx-dropdown-menu
          label="Favorite Animal"
          :value="animal"
          @input="animal = $event.target.value"
          dense
          flat
        >
          <mx-menu-item></mx-menu-item>
          <mx-menu-item>Cat</mx-menu-item>
          <mx-menu-item>Dog</mx-menu-item>
          <mx-menu-item>Walrus</mx-menu-item>
        </mx-dropdown-menu>
      </div>
    </div>
  </div>
</section>
<!-- #endregion dropdown-menus -->

<<< @/vuepress/components/dropdowns.md#dropdown-menus

### Dropdown Menu Properties

| Property        | Attribute        | Description                                                                                      | Type      | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `ariaLabel`     | `aria-label`     |                                                                                                  | `string`  | `undefined` |
| `dense`         | `dense`          |                                                                                                  | `boolean` | `false`     |
| `dropdownClass` | `dropdown-class` | Additional classes for the dropdown wrapper (e.g. `min-w-0` to override the default `min-width`) | `string`  | `undefined` |
| `dropdownId`    | `dropdown-id`    | The `id` attribute for the internal input element                                                | `string`  | `undefined` |
| `elevated`      | `elevated`       | Style as a filter dropdown with a 1dp elevation                                                  | `boolean` | `false`     |
| `flat`          | `flat`           | Style as a filter dropdown with a "flat" border color                                            | `boolean` | `false`     |
| `label`         | `label`          |                                                                                                  | `string`  | `undefined` |
| `name`          | `name`           |                                                                                                  | `string`  | `undefined` |
| `suffix`        | `suffix`         | Text shown to the left of the arrow                                                              | `string`  | `undefined` |
| `value`         | `value`          |                                                                                                  | `any`     | `undefined` |

## Selects

The `mx-select` component wraps the browser's native `select` element. It is designed to be used within traditional forms. Unlike a [Dropdown Menu](#dropdown-menus), a Select can have a floating label and assistive text, as well as disabled and error states.

<!-- #region selects -->
  <section class="mds">
    <div class="grid lg:grid-cols-2 gap-36 mt-20">
      <div>
        <strong>Regular</strong>
        <div class="my-20">
          <mx-select
            label="Favorite Animal"
            :value="animal"
            @input="animal = $event.target.value"
          >
            <option></option>
            <option>Cat</option>
            <option>Dog</option>
            <option>Walrus</option>
          </mx-select>
        </div>
        <div class="my-20">
          <mx-select
            label="Favorite Fruit"
            :value="fruit"
            assistive-text="Yes, avocados are fruits."
            @input="fruit = $event.target.value"
          >
            <option></option>
            <option>Apple</option>
            <option>Avocado</option>
            <option>Strawberry</option>
          </mx-select>
        </div>
        <div class="my-20">
          <mx-select
            label="Size of Home"
            :value="size"
            suffix="SQFT"
            @input="size = $event.target.value"
          >
            <option></option>
            <option>&lt; 1000</option>
            <option>1000-2000</option>
            <option>2001-3000</option>
            <option>3001-4000</option>
            <option>4000+</option>
          </mx-select>
        </div>
        <div class="my-20">
          <mx-select
            label="Select with Error"
            :value="goodOrBad"
            :error="goodOrBad === 'bad'"
            assistive-text="Do not pick the bad option."
            @input="goodOrBad = $event.target.value"
          >
            <option></option>
            <option value="good">Good option</option>
            <option value="bad">Bad option</option>
          </mx-select>
        </div>
        <div class="my-20">
          <mx-select label="Disabled Select" disabled value="Value">
            <option>Value</option>
          </mx-select>
        </div>
      </div>
      <div>
        <strong>Dense</strong>
        <div class="my-20">
          <mx-select
            label="Favorite Animal"
            :value="animal"
            @input="animal = $event.target.value"
            dense
          >
            <option></option>
            <option>Cat</option>
            <option>Dog</option>
            <option>Walrus</option>
          </mx-select>
        </div>
        <div class="my-20">
          <mx-select
            label="Favorite Fruit"
            :value="fruit"
            assistive-text="Yes, avocados are fruits."
            dense
            @input="fruit = $event.target.value"
          >
            <option></option>
            <option>Apple</option>
            <option>Avocado</option>
            <option>Strawberry</option>
          </mx-select>
        </div>
        <div class="my-20">
          <mx-select
            label="Size of Home"
            :value="size"
            suffix="SQFT"
            dense
            @input="size = $event.target.value"
          >
            <option></option>
            <option>&lt; 1000</option>
            <option>1000-2000</option>
            <option>2001-3000</option>
            <option>3001-4000</option>
            <option>4000+</option>
          </mx-select>
        </div>
        <div class="my-20">
          <mx-select
            label="Select with Error"
            :value="goodOrBad"
            :error="goodOrBad === 'bad'"
            assistive-text="Do not pick the bad option."
            dense
            @input="goodOrBad = $event.target.value"
          >
            <option></option>
            <option value="good">Good option</option>
            <option value="bad">Bad option</option>
          </mx-select>
        </div>
        <div class="my-20">
          <mx-select label="Disabled Select" disabled dense value="Value">
            <option>Value</option>
          </mx-select>
        </div>
      </div>
    </div>
  </section>
  <!-- #endregion selects -->

<<< @/vuepress/components/dropdowns.md#selects

### Floating Label / No Label

Add the `floatLabel` prop to create a floating label. The Select component's label is also optional; the Select could simply have an `aria-label` for screen readers.

<!-- #region select-labels -->
<section class="mds">
  <div>
    <div class="my-20 w-320">
      <mx-select
        label="Favorite Animal"
        :value="animal"
        float-label
        assistive-text="This select has a floating label"
        dense
        @input="animal = $event.target.value"
      >
        <option></option>
        <option>Cat</option>
        <option>Dog</option>
        <option>Walrus</option>
      </mx-select>
    </div>
  </div>
  <div>
    <div class="my-20 w-320">
      <mx-select aria-label="Toast condiment" assistive-text="This select only has an aria-label attribute.">
        <option></option>
        <option>Butter</option>
        <option>Jam</option>
      </mx-select>
    </div>
  </div>
</section>
<!-- #endregion select-labels -->

<<< @/vuepress/components/dropdowns.md#select-labels

### Variant Styles

Like the [Dropdown Menu](#dropdown-menus), the Select component also has `flat` and `elevated` style variants.

<!-- #region select-variants -->
<section class="mds">
  <div class="grid lg:grid-cols-2 gap-36 mt-20">
    <div>
      <strong>Flat</strong>
      <div class="mt-20 mb-40">
        <mx-select
          label="Favorite Animal"
          :value="animal"
          flat
          @input="animal = $event.target.value"
        >
          <option></option>
          <option>Cat</option>
          <option>Dog</option>
          <option>Walrus</option>
        </mx-select>
      </div>
      <strong>Elevated</strong>
      <div class="my-20">
        <mx-select
          label="Favorite Animal"
          :value="animal"
          elevated
          @input="animal = $event.target.value"
        >
          <option></option>
          <option>Cat</option>
          <option>Dog</option>
          <option>Walrus</option>
        </mx-select>
      </div>
    </div>
    <div>
      <strong>Flat - Dense</strong>
      <div class="mt-20 mb-40">
        <mx-select
          label="Favorite Animal"
          :value="animal"
          flat
          dense
          @input="animal = $event.target.value"
        >
          <option></option>
          <option>Cat</option>
          <option>Dog</option>
          <option>Walrus</option>
        </mx-select>
      </div>
      <strong>Elevated - Dense</strong>
      <div class="my-20">
        <mx-select
          label="Favorite Animal"
          :value="animal"
          elevated
          dense
          @input="animal = $event.target.value"
        >
          <option></option>
          <option>Cat</option>
          <option>Dog</option>
          <option>Walrus</option>
        </mx-select>
      </div>
    </div>
  </div>
</section>
<!-- #endregion select-variants -->

<<< @/vuepress/components/dropdowns.md#select-variants

### Select Properties

| Property        | Attribute        | Description                                                                                    | Type      | Default     |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------- | --------- | ----------- |
| `ariaLabel`     | `aria-label`     |                                                                                                | `string`  | `undefined` |
| `assistiveText` | `assistive-text` | Helpful text to show below the select                                                          | `string`  | `undefined` |
| `dense`         | `dense`          |                                                                                                | `boolean` | `false`     |
| `disabled`      | `disabled`       |                                                                                                | `boolean` | `false`     |
| `elevated`      | `elevated`       | Style with a 1dp elevation                                                                     | `boolean` | `false`     |
| `error`         | `error`          |                                                                                                | `boolean` | `false`     |
| `flat`          | `flat`           | Style with a "flat" border color                                                               | `boolean` | `false`     |
| `floatLabel`    | `float-label`    |                                                                                                | `boolean` | `false`     |
| `label`         | `label`          |                                                                                                | `string`  | `undefined` |
| `labelClass`    | `label-class`    | Additional classes for the label                                                               | `string`  | `''`        |
| `name`          | `name`           |                                                                                                | `string`  | `undefined` |
| `selectClass`   | `select-class`   | Additional classes for the select wrapper (e.g. `min-w-0` to override the default `min-width`) | `string`  | `undefined` |
| `selectId`      | `select-id`      | The `id` attribute for the select element                                                      | `string`  | `undefined` |
| `suffix`        | `suffix`         | Text shown to the left of the arrow                                                            | `string`  | `undefined` |
| `value`         | `value`          |                                                                                                | `any`     | `undefined` |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#dropdowns

<script>
export default {
  data() {
    return {
      animal: '',
      fruit: '',
      size: '',
      goodOrBad: 'bad',
    }
  }
}
</script>
