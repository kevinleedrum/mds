# Menus

## Menus & Menu Items

Menus appear by clicking an "anchor" element and may include submenus and checkboxes for multiple selection. Also see [Dropdown Menus](/components/dropdowns.html#dropdown-menus), which use the Menu component internally to allow for a single selection.

By setting the Menu's `anchorEl` prop to a clickable element, the menu will open whenever that element is clicked. By default, the menu will open below the element, aligned to the left edge. The default placement can be changed via the `placement` prop. If the default placement does not have available space for the menu, then the placement will be changed automatically.

To nest a Menu inside a Menu Item, add `slot="submenu"` to the child Menu component. To add a divider between items, use a traditional `hr` element.

<!-- #region menus -->
<section class="mds">
  <div class="mt-20">
    <div class="flex items-center mt-20 space-x-20">
      <div>
        <mx-button ref="editButton" btn-type="simple" dropdown>Edit</mx-button>
        <mx-menu ref="editMenu">
          <mx-menu-item @click="clickHandler">Undo</mx-menu-item>
          <mx-menu-item @click="clickHandler" disabled>Redo</mx-menu-item>
          <mx-menu-item @click="clickHandler">Cut</mx-menu-item>
          <mx-menu-item @click="clickHandler">Copy</mx-menu-item>
          <hr>
          <mx-menu-item>
            Find &amp; Sort
            <mx-menu slot="submenu">
              <mx-menu-item @click="clickHandler">Find&hellip;</mx-menu-item>
              <mx-menu-item @click="clickHandler">Find Next</mx-menu-item>
              <mx-menu-item @click="clickHandler">Find Previous</mx-menu-item>
              <mx-menu-item>
                Sort By
                <mx-menu slot="submenu">
                  <mx-menu-item @click="clickHandler">Name</mx-menu-item>
                  <mx-menu-item checked @click="clickHandler">Date Modified</mx-menu-item>
                  <mx-menu-item @click="clickHandler">Size</mx-menu-item>
                </mx-menu>
              </mx-menu-item>
            </mx-menu>
          </mx-menu-item>
        </mx-menu>
      </div>
      <div>
        <mx-icon-button ref="actionButton" el-aria-label="Open action menu" chevron-down />
        <mx-menu ref="actionMenu">
          <mx-menu-item icon="ph-file" @click="clickHandler">New&hellip;</mx-menu-item>
          <mx-menu-item icon="ph-folder-open" @click="clickHandler">Open&hellip;</mx-menu-item>
          <hr>
          <mx-menu-item icon="ph-floppy-disk" @click="clickHandler">Save</mx-menu-item>
          <mx-menu-item @click="clickHandler">Save As&hellip;</mx-menu-item>
          <hr>
          <mx-menu-item @click="clickHandler">Close</mx-menu-item>
        </mx-menu>
      </div>
    </div>
  </div>
</section>
<!-- #endregion menus -->

<<< @/vuepress/components/menus.md#menus
<<< @/vuepress/components/menus.md#menus-anchorEl

### Headings, labels, subtitles & checkboxes

Place a paragraph element with a `role` of "heading" inside a menu to add a section label. Use the Menu Item's `label` prop to add a label to an individual item. Use the `subtitle` prop to add a subtitle below the menu item text.

To add checkboxes to Menu Items, add the `multi-select` property, and set the `checked` accordingly. The `checked` property can also be used without `multi-select` to simply add a checkmark icon to the item.

<!-- #region menus-2 -->
<section class="mds">
  <div class="mt-20">
    <div class="flex items-center mt-20 space-x-20">
      <div>
        <mx-icon-button ref="dotsButton" el-aria-label="Open menu" icon="ph-dots-three-outline" />
        <mx-menu ref="dotsMenu">
          <p role="heading" aria-level="1">Appearance</p>
          <mx-menu-item multi-select checked @click="clickHandler">Show Minimap</mx-menu-item>
          <mx-menu-item multi-select @click="clickHandler">Word Wrap</mx-menu-item>
          <mx-menu-item @click="clickHandler" label="Email">design@moxiworks.com</mx-menu-item>
          <mx-menu-item @click="clickHandler" subtitle="123 Bremerton Pl Ne">
            Office One
          </mx-menu-item>
        </mx-menu>
      </div>
      <div>
        <mx-button ref="menuButton">Open Menu</mx-button>
        <mx-menu ref="scrollingMenu">
          <mx-menu-item v-for="i in 12" :key="i" checked>Menu Item {{i}}</mx-menu-item>
        </mx-menu>
      </div>
    </div>
  </div>
</section>
<!-- #endregion menus-2 -->

<<< @/vuepress/components/menus.md#menus-2
<<< @/vuepress/components/menus.md#menus-anchorEl-2

## Suggestion and autocomplete menus

When the `anchorEl` contains an `<input type=text>` or `<input type=search>`, the menu takes on some
additional behaviors to allow the menu to function as an autocomplete or suggestion menu.

These additional behaviors include:

- &bull; The menu stretches the entire width of the `anchorEl`.
- &bull; Typing into the input opens the menu.
- &bull; Typing while a menu item is focused restores focus to the input.
- &bull; The input's `autocomplete` attribute is set to `off` to disable the browser's native autocomplete menu.

Setting the `autocompleteOnly` prop to `true` causes the top menu item to always be selected by default,
and pressing <kbd>Enter</kbd> inside the input will effectively click that item. Leave this set to `false` to
allow submitting the input value without selecting a menu item.

In the first example below, typing "app" and pressing <kbd>Enter</kbd> will log "app" to the console. In the second
example, "Apple" will be logged because the `autoCompleteOnly` prop causes the first menu item to be
selected on <kbd>Enter</kbd>.

<section class="mds">
  <div class="mt-40">
    <!-- #region suggestions-1 -->
    <mx-search
      ref="search1"
      :value="term1"
      class="w-288"
      placeholder="Fruit"
      @input="term1 = $event.target.value"
      @keydown.enter="onClickSuggestion($event.target.value, 1)"
    />
    <mx-menu ref="menu1">
      <mx-menu-item v-for="(suggestion, i) in suggestions1" :key="i" @click="onClickSuggestion(suggestion, 1)">
        {{ suggestion }}
      </mx-menu-item>
    </mx-menu>
    <!-- #endregion suggestions-1 -->
  </div>
</section>

<<< @/vuepress/components/menus.md#suggestions-1

<section class="mds">
  <div class="mt-40">
    <!-- #region suggestions-2 -->
    <mx-search
      ref="search2"
      :value="term2"
      class="w-288"
      placeholder="Fruit (autocompleteOnly)"
      @input="term2 = $event.target.value"
    />
    <mx-menu ref="menu2" autocomplete-only>
      <mx-menu-item v-for="(suggestion, i) in suggestions2" :key="i" @click="onClickSuggestion(suggestion, 2)">
        {{ suggestion }}
      </mx-menu-item>
    </mx-menu>
    <!-- #endregion suggestions-2 -->
  </div>
</section>

<<< @/vuepress/components/menus.md#suggestions-2
<<< @/vuepress/components/menus.md#suggestions-computed
<<< @/vuepress/components/menus.md#menus-anchorEl-3
<<< @/vuepress/components/menus.md#suggestions-onclick

### Grouped autocomplete menu with headings

Below is an example of an autocomplete menu that uses headings to show different groups of matches.

<section class="mds">
  <div class="mt-40">
    <!-- #region suggestions-3 -->
    <mx-search
      ref="search3"
      :value="term3"
      class="w-288"
      placeholder="Fruit or vegetable"
      @input="term3 = $event.target.value"
      @keydown.enter="onClickSuggestion($event.target.value, 3)"
    />
    <mx-menu ref="menu3">
      <template v-for="suggestionGroup in suggestionGroups">
        <p :key="suggestionGroup.heading" role="heading" aria-level="2">{{ suggestionGroup.heading }}</p>
        <mx-menu-item v-for="(suggestion, i) in suggestionGroup.suggestions" :key="suggestionGroup.heading + i" @click="onClickSuggestion(suggestion, 3)">
          {{ suggestion }}
        </mx-menu-item>
      </template>
    </mx-menu>
    <!-- #endregion suggestions-3 -->
  </div>
</section>

<<< @/vuepress/components/menus.md#suggestions-3
<<< @/vuepress/components/menus.md#suggestion-groups

### Menu Properties

| Property           | Attribute           | Description                                                                                                                                      | Type                                                                                                                                                                                                         | Default          |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `anchorEl`         | --                  | The element to which the menu's position will be anchored                                                                                        | `HTMLElement`                                                                                                                                                                                                | `undefined`      |
| `autocompleteOnly` | `autocomplete-only` | If the anchor element contains an `input`, setting this to `true` will always select the first menu item when Enter is pressed inside the input. | `boolean`                                                                                                                                                                                                    | `false`          |
| `isOpen`           | `is-open`           | This is set to true automatically when the `anchorEl` is clicked. Dropdown menus read this prop internally for styling purposes.                 | `boolean`                                                                                                                                                                                                    | `false`          |
| `offset`           | --                  | An array of offsets in pixels. The first is the "skidding" along the edge of the `anchorEl`. The second is the distance from the `anchorEl`.     | `[number, number]`                                                                                                                                                                                           | `undefined`      |
| `placement`        | `placement`         | The placement of the menu, relative to the `anchorEl`.                                                                                           | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |
| `triggerEl`        | --                  | The element that will open the menu when clicked. If not provided, the `anchorEl` will be used.                                                  | `HTMLElement`                                                                                                                                                                                                | `undefined`      |

### Menu Item Properties

| Property      | Attribute      | Description                                                                                                                                                                                          | Type      | Default     |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `checked`     | `checked`      | If `multiSelect` is false, this will render a checkmark on the right side of the menu item. If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked. | `boolean` | `false`     |
| `disabled`    | `disabled`     |                                                                                                                                                                                                      | `boolean` | `false`     |
| `icon`        | `icon`         | The class name of the icon to display on the left. This is sometimes automatically set to `null` to add an empty icon for alignment purposes (when a sibling menu item has an icon).                 | `string`  | `undefined` |
| `label`       | `label`        | A label to display above the menu item                                                                                                                                                               | `string`  | `undefined` |
| `multiSelect` | `multi-select` | Render a checkbox as part of the menu item. On small screens, the checkbox will appear on the left; otherwise, it will be on the right.                                                              | `boolean` | `false`     |
| `selected`    | `selected`     | This is automatically set by a parent Dropdown Menu.                                                                                                                                                 | `boolean` | `false`     |
| `subtitle`    | `subtitle`     | A subtitle to display below the menu item text                                                                                                                                                       | `string`  | `undefined` |

### Menu Events

| Event     | Description                   | Type                |
| --------- | ----------------------------- | ------------------- |
| `mxClose` | Emitted when the menu closes. | `CustomEvent<void>` |

### Menu Item Events

| Event     | Description                                                                                               | Type                      |
| --------- | --------------------------------------------------------------------------------------------------------- | ------------------------- |
| `mxClick` | Fired when an enabled menu item without a submenu is clicked. Used interally to close all ancestor menus. | `CustomEvent<MouseEvent>` |

### Menu Methods

#### `closeMenu() => Promise<boolean>`

Close the menu. Returns a promise that resolves to false if the menu was already closed.

#### `openMenu() => Promise<boolean>`

Open the menu. Returns a promise that resolves to false if the menu was already open.

### Menu Item Methods

#### `closeSubMenu() => Promise<boolean>`

Closes the item's submenu.

#### `getValue() => Promise<string>`

Returns the menu item inner text (excluding any label or subtitle)

#### `focusMenuItem() => Promise<void>`

Focuses the menu item.

### CSS Variables

<<< @/src/tailwind/variables/index.scss#menus

<script>
const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Dragonfruit',
  'Kiwi',
  'Strawberry',
  'Tomato'
]
const vegetables = [
  'Corn',
  'Pea',
  'Lettuce',
  'Carrot',
  'Onion',
  'Radish',
  'Broccoli',
  'Kale'
]

export default {
  data() {
    return {
      term1: '',
      term2: '',
      term3: ''
    }
  },
  computed: {
    // #region suggestions-computed
    suggestions1() {
      if (!this.term1) return []
      return fruits.filter(fruit => 
        fruit.toLowerCase().includes(this.term1.toLowerCase())
      )
    },
    suggestions2() {
      if (!this.term2) return []
      return fruits.filter(fruit => 
        fruit.toLowerCase().includes(this.term2.toLowerCase())
      )
    },
    // #endregion suggestions-computed
    // #region suggestion-groups
    suggestionGroups() {
      if (!this.term3) return []
      const groups = []
      const match = item => item.toLowerCase().includes(this.term3.toLowerCase())
      const fruitMatches = fruits.filter(match)
      const veggieMatches = vegetables.filter(match)
      if (fruitMatches.length) groups.push({ heading: 'Fruits', suggestions: fruitMatches })
      if (veggieMatches.length) groups.push({ heading: 'Vegetables', suggestions: veggieMatches })
      return groups
    }
    // #endregion suggestion-groups
  },
  mounted() {
    // #region menus-anchorEl
    // For JSX-based frameworks, you may be able to set the anchorEl within the template.
    // Otherwise, assign the anchorEl property in your script.

    this.$refs.editMenu.anchorEl = this.$refs.editButton
    this.$refs.actionMenu.anchorEl = this.$refs.actionButton
    // #endregion menus-anchorEl
    // #region menus-anchorEl-2
    this.$refs.dotsMenu.anchorEl = this.$refs.dotsButton
    this.$refs.scrollingMenu.anchorEl = this.$refs.menuButton
    // #endregion menus-anchorEl-2
    // #region menus-anchorEl-3
    this.$refs.menu1.anchorEl = this.$refs.search1
    this.$refs.menu2.anchorEl = this.$refs.search2
    this.$refs.menu3.anchorEl = this.$refs.search3
    // #endregion menus-anchorEl-3
  },
  methods: {
    clickHandler() {
      console.log('Menu item clicked!')
    },
    // #region suggestions-onclick
    onClickSuggestion(suggestion, num) {
      console.log(suggestion + ' entered!')
      // Clear the input and refocus it
      this['term' + num] = ''
      this.$nextTick(() => this.$refs['search' + num].querySelector('input').focus())
    }
    // #endregion suggestions-onclick
  }
}
</script>
