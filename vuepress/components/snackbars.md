# Snackbars

Snackbars are used to alert the user of changes, usually in direct result of an action the user has taken. For example, a confirmation of a deleted item. These are utilitarian and should not be used for marketing alerts.

The main content of the snackbar is placed in the default slot. If an action is needed, add a [Text Button](/components/buttons.html#text-buttons) to the `action` slot.

If multiple snackbars are triggered, they will be queued and displayed consecutively.

<!-- #region snackbars -->
<section class="mds">
  <div class="my-20">
    <mx-button btn-type="action" @click="isOpen1 = true">Trigger Simple Snackbar</mx-button>
    <mx-snackbar :is-open="isOpen1" @mxClose="isOpen1 = false">
      Page has been published
    </mx-snackbar>
  </div>
  <div class="my-20">
    <mx-button btn-type="action" @click="isOpen2 = true">Trigger Snackbar with Action</mx-button>
    <mx-snackbar :is-open="isOpen2" duration="5000" @mxClose="isOpen2 = false">
      Page has been published
      <mx-button slot="action" btn-type="text">Undo</mx-button>
    </mx-snackbar>
  </div>
  <div class="my-20">
    <mx-button btn-type="action" @click="isOpen3 = true">Trigger Multi-Line Snackbar with Action</mx-button>
    <mx-snackbar :is-open="isOpen3" @mxClose="isOpen3 = false">
      The <strong>Hello World</strong> page has been successfully published
      <mx-button slot="action" btn-type="text">Dismiss</mx-button>
    </mx-snackbar>
  </div>
</section>
  <!-- #endregion snackbars -->

<<< @/vuepress/components/snackbars.md#snackbars

### Properties

| Property   | Attribute  | Description | Type      | Default |
| ---------- | ---------- | ----------- | --------- | ------- |
| `duration` | `duration` |             | `number`  | `6000`  |
| `isOpen`   | `is-open`  |             | `boolean` | `false` |

### Events

| Event     | Description | Type                |
| --------- | ----------- | ------------------- |
| `mxClose` |             | `CustomEvent<void>` |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#snackbars

<script>
export default {
  data() {
    return {
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
    }
  }
}
</script>
