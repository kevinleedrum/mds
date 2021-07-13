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
        <mx-button ref="editButton" btn-type="action" dropdown>Edit</mx-button>
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
        <mx-icon-button ref="actionButton" chevron-down />
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

Place a paragraph element with a `role` of "heading" inside a menu to add a section label. Use the Menu Item's `label` prop to add a label to an individual item.

To add checkboxes to Menu Items, add the `multi-select` property, and set the `checked` accordingly. The `checked` property can also be used without `multi-select` to simply add a checkmark icon to the item.

<!-- #region menus-2 -->
<section class="mds">
  <div class="mt-20">
    <div class="flex items-center mt-20 space-x-20">
      <div>
        <mx-icon-button ref="dotsButton" icon="ph-dots-three-outline" />
        <mx-menu ref="dotsMenu">
          <p role="heading">Appearance</p>
          <mx-menu-item multi-select checked @click="clickHandler">Show Minimap</mx-menu-item>
          <mx-menu-item multi-select @click="clickHandler">Word Wrap</mx-menu-item>
          <mx-menu-item @click="clickHandler" label="Email">design@moxiworks.com</mx-menu-item>
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

### Menu Properties

| Property    | Attribute   | Description                                                                                                                                  | Type                                                                                                                                                                                           | Default          |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `anchorEl`  | --          | The element that will open the menu when clicked                                                                                             | `HTMLElement`                                                                                                                                                                                  | `undefined`      |
| `isOpen`    | `is-open`   | This is set to true automatically when the `anchorEl` is clicked. Dropdown menus read this prop internally for styling purposes.             | `boolean`                                                                                                                                                                                      | `false`          |
| `offset`    | --          | An array of offsets in pixels. The first is the "skidding" along the edge of the `anchorEl`. The second is the distance from the `anchorEl`. | `[number, number]`                                                                                                                                                                             | `undefined`      |
| `placement` | `placement` | The placement of the menu, relative to the `anchorEl`.                                                                                       | `"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"` | `'bottom-start'` |

### Menu Item Properties

| Property      | Attribute      | Description                                                                                                                                                                                          | Type      | Default     |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `checked`     | `checked`      | If `multiSelect` is false, this will render a checkmark on the right side of the menu item. If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked. | `boolean` | `false`     |
| `disabled`    | `disabled`     |                                                                                                                                                                                                      | `boolean` | `false`     |
| `icon`        | `icon`         | The class name of the icon to display on the left. This is sometimes automatically set to `null` to add an empty icon for alignment purposes (when a sibling menu item has an icon).                 | `string`  | `undefined` |
| `label`       | `label`        | A label to display above the menu item                                                                                                                                                               | `string`  | `undefined` |
| `multiSelect` | `multi-select` | Render a checkbox as part of the menu item. On small screens, the checkbox will appear on the left; otherwise, it will be on the right.                                                              | `boolean` | `false`     |

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

#### `focusMenuItem() => Promise<void>`

Focuses the menu item.

## CSS Variables

<<< @/src/tailwind/variables/index.scss#menus

<script>
export default {
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
  },
  methods: {
    clickHandler() {
      console.log('Menu item clicked!')
    }
  }
}
</script>
