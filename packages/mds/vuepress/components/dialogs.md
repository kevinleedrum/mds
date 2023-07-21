# Dialogs

The `mx-dialog` component is used to inform users about a task and can contain critical information, require decisions, or involve multiple tasks. For more complex UI, a [Modal](/components/modals.html) may be preferrable. If user interruption is not strictly required, consider using a [Banner](/components/banners.md) or [Snackbar](/components/snackbars.html) instead.

### Simple dialogs via methods

Currently, `mx-dialog` exposes two methods: `alert()` and `confirm()`, which are intended to be replacements for [`Window.alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) and [`Window.confirm()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) respectively. The signatures for these two methods are identical, but with different default values for `confirmLabel` and `cancelLabel` (to match the behavior of the aforementioned `Window` methods).

For simple dialogs without markup, it is possible to use a single instance of the `mx-dialog` element to invoke every dialog needed for the page.

<section class="mds">
  <div class="flex flex-col items-start space-y-20">
    <!-- #region simple -->
    <mx-button @click="() => $refs.dialog.alert('Greetings!')">Basic Alert Call</mx-button>
    <mx-button @click="advancedAlert">Advanced Alert Call</mx-button>
    <mx-button @click="confirmation">Basic Confirm Call</mx-button>
    <mx-button @click="advancedConfirmation">Advanced Confirm Call</mx-button>
    <mx-dialog ref="dialog" />
    <!-- #endregion simple -->
  </div>
</section>

<<< @/vuepress/components/dialogs.md#simple
<<< @/vuepress/components/dialogs.md#methods

### Advanced dialogs via slots

For more advanced dialog layouts, pass the markup into the default slot, as well as the `heading` and `buttons` slots, and use the `isOpen` prop to toggle the dialog. The dialog
emits an `mxClose` event that may be useful to update the `isOpen` boolean in state.

<section class="mds">
  <div class="flex flex-col items-start space-y-20">
    <!-- #region advanced -->
    <mx-button @click="isDialogOpen = !isDialogOpen">Open Dialog</mx-button>
    <mx-dialog
      :is-open.prop="isDialogOpen"
      modal-class="w-320 sm:w-480 max-h-480"
      @mxClose="isDialogOpen = false"
    >
      <span slot="heading">Create new audience with selected</span>
      <mx-input label="Audience Name" />
      <p class="my-16">4,800 contacts will be added to this audience.</p>
      <p>
        We only wear jeans or track pants on Friday. You can’t wear a tank top two days in a row. You can only wear your hair in a ponytail once a week. So, I guess, you picked today. And if you break any of these rules you can’t sit with us at lunch. I mean, not just you, any of us. Like, if I was wearing jeans today, I would be sitting over there with the art freaks.
      </p>
      <p>
        We always vote before we ask someone to eat lunch with us, because you have to be considerate of the rest of the group. I mean, you wouldn’t buy a skirt without asking your friends first if it looks good on you. It’s the same with guys. You may think you like someone, but you could be wrong.
      </p>
      <div slot="buttons">
        <mx-button btn-type="text" @click="isDialogOpen = false">
          Cancel
        </mx-button>
        <mx-button btn-type="text" @click="isDialogOpen = false">
          Save &amp; Add
        </mx-button>
      </div>
    </mx-dialog>
    <!-- #endregion advanced -->
  </div>
</section>

<<< @/vuepress/components/dialogs.md#advanced

### Properties

| Property     | Attribute     | Description                                                              | Type      | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------ | --------- | ----------- |
| `isOpen`     | `is-open`     | Toggles the visibility of the dialog (when using the slots for content). | `boolean` | `false`     |
| `modalClass` | `modal-class` | Additional classes to apply to the inner modal element.                  | `string`  | `undefined` |

### Methods

#### `alert(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions) => Promise<void>`

A Promise-based replacement for `Window.alert()` with some additional options

#### `confirm(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions) => Promise<boolean>`

A Promise-based replacement for `Window.confirm()` that resolves to a boolean

### Events

| Event     | Description | Type                |
| --------- | ----------- | ------------------- |
| `mxClose` |             | `CustomEvent<void>` |

<script>
export default {
  data() {
    return {
      isDialogOpen: false
    }
  },
  methods: {
    // #region methods
    advancedAlert() {
      const options = { heading: 'Alert!', confirmLabel: 'Okey dokey'}
      this.$refs.dialog.alert('This alert has a heading and a custom confirmation button label.', options)
    },
    async confirmation() {
      const confirmed = await this.$refs.dialog.confirm('Are you sure about this?')
      this.$refs.dialog.alert(confirmed ? 'You clicked Okay.' : 'You did not click Okay.')
    },
    async advancedConfirmation() {
      const options = { heading: 'Pancakes', confirmLabel: 'Yes please', cancelLabel: 'No, I do not want pancakes'}
      const confirmed = await this.$refs.dialog.confirm('Would you like some pancakes?', options)
      this.$refs.dialog.alert(confirmed ? 'You accepted the pancakes.' : 'You declined the pancakes.')
    }
    // #endregion methods
  }
}
</script>
