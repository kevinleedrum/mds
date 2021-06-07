# Dropdowns

## Selects

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
          <mx-select label="Disabled Select" disabled>
            <option></option>
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
          <mx-select label="Disabled Select" disabled dense>
            <option></option>
          </mx-select>
        </div>
      </div>
    </div>
  </section>
  <!-- #endregion selects -->

<<< @/vuepress/components/dropdowns.md#selects

### Alternate Label / No Label

<!-- #region select-labels -->
<section class="mds">
  <div>
    <div class="my-20 w-192">
      <label for="favorite-animal" class="block text-sm mb-4 font-semibold tracking-0-4">
        Favorite Animal
      </label>
      <mx-select
        id="favorite-animal"
        :value="animal"
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

| Property        | Attribute        | Description                               | Type      | Default     |
| --------------- | ---------------- | ----------------------------------------- | --------- | ----------- |
| `ariaLabel`     | `aria-label`     |                                           | `string`  | `undefined` |
| `assistiveText` | `assistive-text` | Helpful text to show below the select     | `string`  | `undefined` |
| `dense`         | `dense`          |                                           | `boolean` | `false`     |
| `disabled`      | `disabled`       |                                           | `boolean` | `false`     |
| `elevated`      | `elevated`       | Style with a 1dp elevation                | `boolean` | `false`     |
| `error`         | `error`          |                                           | `boolean` | `false`     |
| `flat`          | `flat`           | Style with a "flat" border color          | `boolean` | `false`     |
| `label`         | `label`          |                                           | `string`  | `undefined` |
| `labelClass`    | `label-class`    | Additional classes for the label          | `string`  | `''`        |
| `name`          | `name`           |                                           | `string`  | `undefined` |
| `selectId`      | `select-id`      | The `id` attribute for the select element | `string`  | `undefined` |
| `suffix`        | `suffix`         | Text shown to the left of the arrow       | `string`  | `undefined` |
| `value`         | `value`          |                                           | `any`     | `undefined` |

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
