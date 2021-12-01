# Dialogs

The `mx-dialog` component is used to inform users about a task and can contain critical information, require decisions, or involve multiple tasks. For more complex UI, a [Modal](/components/modals.html) may be preferrable. If user interruption is not strictly required, consider using a [Banner](/components/banners.md) or [Snackbar](/components/snackbars.html) instead.

Currently, `mx-dialog` exposes two methods: `alert()` and `confirm()`, which are intended to be replacements for [`Window.alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) and [`Window.confirm()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) respectively. The signatures for these two methods are identical, but with different default values for `confirmLabel` and `cancelLabel` (to match the behavior of the aforementioned `Window` methods).

Since the Dialog component is propless, it is possible to use a single instance of the `mx-dialog` element to invoke every dialog needed for the page.

<section class="mds">
  <div class="flex flex-col items-start space-y-20">
    <!-- #region dialogs -->
    <mx-button @click="() => $refs.dialog.alert('Greetings!')">Basic Alert Call</mx-button>
    <mx-button @click="advancedAlert">Advanced Alert Call</mx-button>
    <mx-button @click="confirmation">Basic Confirm Call</mx-button>
    <mx-button @click="advancedConfirmation">Advanced Confirm Call</mx-button>
    <mx-dialog ref="dialog" />
    <!-- #endregion dialogs -->
  </div>
</section>

<<< @/vuepress/components/dialogs.md#dialogs
<<< @/vuepress/components/dialogs.md#methods

### Dialog Methods

#### `alert(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions) => Promise<void>`

A Promise-based replacement for `Window.alert()` with some additional options

#### `confirm(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions) => Promise<boolean>`

A Promise-based replacement for `Window.confirm()` that resolves to a boolean

### CSS Variables

<<< @/src/tailwind/variables/index.scss#dialogs

<script>
export default {
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
