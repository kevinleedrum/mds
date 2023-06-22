# Chips

Chips are compact elements that represent an input, attribute, or action.

<section class="mds">
<!-- #region basic-chips -->
<div>
  <strong>Filled</strong>
  <div class="flex flex-wrap mb-8">
    <mx-chip class="m-8">
      Basic Chip
    </mx-chip>
    <mx-chip removable class="m-8">
      Removable
    </mx-chip>
    <mx-chip clickable class="m-8">
      Clickable
    </mx-chip>
    <mx-chip removable selected clickable class="m-8">
      Clickable, Selected &amp; Removable
    </mx-chip>
    <mx-chip clickable disabled removable avatar-url="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" class="m-8">
      Disabled
    </mx-chip>
  </div>
  <strong>Outlined</strong>
  <div class="flex flex-wrap">
    <mx-chip outlined class="m-8">
      Basic Chip
    </mx-chip>
    <mx-chip outlined removable class="m-8">
      Removable
    </mx-chip>
    <mx-chip outlined clickable class="m-8">
      Clickable
    </mx-chip>
    <mx-chip outlined removable selected clickable class="m-8">
      Clickable, Selected &amp; Removable
    </mx-chip>
    <mx-chip outlined clickable disabled removable avatar-url="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" class="m-8">
      Disabled
    </mx-chip>
  </div>
</div>
<!-- #endregion basic-chips -->
</section>

<<< @/vuepress/components/chips.md#basic-chips

## Input Chips

Input Chips represent complex pieces of information.

<section class="mds">
<!-- #region input-chips -->
  <div class="flex flex-wrap">
    <mx-chip removable class="m-8"> Alaska </mx-chip>
    <mx-chip
      avatar-url="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
      class="m-8"
    >
      Bilbo Baggins
    </mx-chip>
    <mx-chip
      removable
      :selected="isFrodoSelected"
      clickable
      avatar-url="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
      class="m-8"
      @click="isFrodoSelected = !isFrodoSelected"
    >
      Frodo Baggins
    </mx-chip>
    <mx-chip icon="ph-bicycle" class="m-8"> Biking </mx-chip>
    <mx-chip
      clickable
      :selected="isHotelsSelected"
      class="m-8"
      @click="isHotelsSelected = !isHotelsSelected"
    >
      Hotels
    </mx-chip>
  </div>
  <div class="flex flex-wrap">
    <mx-chip outlined removable class="m-8"> Alaska </mx-chip>
    <mx-chip
      outlined
      avatar-url="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
      class="m-8"
    >
      Bilbo Baggins
    </mx-chip>
    <mx-chip
      outlined
      removable
      :selected="isFrodoSelected"
      clickable
      avatar-url="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
      class="m-8"
      @click="isFrodoSelected = !isFrodoSelected"
    >
      Frodo Baggins
    </mx-chip>
    <mx-chip outlined icon="ph-bicycle" class="m-8"> Biking </mx-chip>
    <mx-chip
      outlined
      clickable
      :selected="isHotelsSelected"
      class="m-8"
      @click="isHotelsSelected = !isHotelsSelected"
    >
      Hotels
    </mx-chip>
  </div>
  <!-- #endregion input-chips -->
</section>

<<< @/vuepress/components/chips.md#input-chips

## Choice Chips

Choice Chips are used to make a single selection from at least two options, much like a [Radio Group](/components/selection-controls.html#radio-buttons) or [Toggle Button Group](http://localhost:8080/components/buttons.html#toggle-button-groups).

To simplify the creation of Choice Chips, use the `mx-chip-group` component to wrap your `mx-chip` instances. The `mx-chip-group` accepts a `value` prop and emits an `mxInput` event in order to bind to your model.

<section class="mds">
<!-- #region choice-chips -->
  <div class="flex flex-wrap m-8">
    <mx-chip-group :value="size" class="space-x-8" @mxInput="e => size = e.detail">
      <mx-chip value="small">Small</mx-chip>
      <mx-chip value="medium">Medium</mx-chip>
      <mx-chip value="large">Large</mx-chip>
    </mx-chip-group>
  </div>
  <div class="flex flex-wrap m-8">
    <mx-chip-group :value="size" class="space-x-8" @mxInput="e => size = e.detail">
      <mx-chip outlined value="small">Small</mx-chip>
      <mx-chip outlined value="medium">Medium</mx-chip>
      <mx-chip outlined value="large">Large</mx-chip>
    </mx-chip-group>
  </div>
<!-- #endregion choice-chips -->
</section>

<<< @/vuepress/components/chips.md#choice-chips

## Filter Chips

Filter Chips are used to make multiple selections from a collection of filters, much like a [Checkbox Group](/components/selection-controls.html#checkboxes).

<section class="mds">
<!-- #region filter-chips -->
<div class="flex flex-wrap">
  <mx-chip
    v-for="genre in genres"
    :key="genre"
    filter
    :selected="isGenreSelected(genre)"
    class="m-8"
    @click="toggleGenre(genre)"
  >
    {{ genre }}
  </mx-chip>
</div>
<div class="flex flex-wrap">
  <mx-chip
    v-for="genre in genres"
    :key="genre"
    outlined
    filter
    :selected="isGenreSelected(genre)"
    class="m-8"
    @click="toggleGenre(genre)"
  >
    {{ genre }}
  </mx-chip>
</div>
<!-- #endregion filter-chips -->
</section>

<<< @/vuepress/components/chips.md#filter-chips

## Action Chips

Action Chips trigger contextual actions much like [Buttons](/components/buttons).

<section class="mds">
<!-- #region action-chips -->
<div class="flex flex-wrap">
  <mx-chip clickable icon="ph-alarm" class="m-8">
    Set alarm
  </mx-chip>
  <mx-chip clickable avatar-url="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" class="m-8">
    View profile
  </mx-chip>
  <mx-chip clickable icon="ph-bug" class="m-8">
    Report issue
  </mx-chip>
</div>
<div class="flex flex-wrap">
  <mx-chip clickable outlined icon="ph-alarm" class="m-8">
    Set alarm
  </mx-chip>
  <mx-chip clickable outlined avatar-url="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" class="m-8">
    View profile
  </mx-chip>
  <mx-chip clickable outlined icon="ph-bug" class="m-8">
    Report issue
  </mx-chip>
</div>
<!-- #endregion action-chips -->
</section>

<<< @/vuepress/components/chips.md#action-chips

### Chip Properties

| Property    | Attribute    | Description                                                                                                                 | Type      | Default     |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `avatarUrl` | `avatar-url` | URL of image to show on the left                                                                                            | `string`  | `undefined` |
| `choice`    | `choice`     | Style as a choice chip when selected. This is set internally when the chip is wrapped with an `mx-chip-group`.              | `boolean` | `false`     |
| `clickable` | `clickable`  | Use the pointer cursor and show a ripple animation. This does not need to be explicitly set for `choice` or `filter` chips. | `boolean` | `false`     |
| `disabled`  | `disabled`   |                                                                                                                             | `boolean` | `false`     |
| `filter`    | `filter`     | Style as a filter chip when selected                                                                                        | `boolean` | `false`     |
| `icon`      | `icon`       | Class name of icon to show on the left                                                                                      | `string`  | `undefined` |
| `outlined`  | `outlined`   |                                                                                                                             | `boolean` | `false`     |
| `removable` | `removable`  | Show the remove icon on the right                                                                                           | `boolean` | `false`     |
| `selected`  | `selected`   | Display a checkmark on the left side of the chip                                                                            | `boolean` | `false`     |
| `value`     | `value`      | The value associated with a choice chip (used with `mx-chip-group`)                                                         | `any`     | `undefined` |

### Chip Group Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `value`  | `value`   |             | `any` | `undefined` |

### Chip Events

| Event      | Description                             | Type                      |
| ---------- | --------------------------------------- | ------------------------- |
| `mxRemove` | Emitted when the remove icon is clicked | `CustomEvent<MouseEvent>` |

### Chip Group Events

| Event     | Description                             | Type               |
| --------- | --------------------------------------- | ------------------ |
| `mxInput` | Emits the updated value as event.detail | `CustomEvent<any>` |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#chips

<script>
export default {
  data() {
    return {
      isFrodoSelected: true,
      isHotelsSelected: true,
      size: 'medium',
      genres: ['Action', 'Comedy', 'Drama', 'Sci-Fi'],
      selectedGenres: ['Comedy', 'Drama'],
    }
  },
  methods: {
    isGenreSelected(genre) {
      return this.selectedGenres.includes(genre)
    },
    toggleGenre(genre) {
      if (this.isGenreSelected(genre)) this.selectedGenres = this.selectedGenres.filter(g => g !== genre)
      else this.selectedGenres.push(genre)
    }
  }
}
</script>
