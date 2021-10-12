# Modals

Modals appear in front of app content and remain on screen until the user takes action to close the modal.

To open or close a modal, set its `isOpen` prop to `true` or `false`. The modal will emit an `mxClose` event when the user clicks the Close button, presses <kbd>Esc</kbd>, or clicks outside the modal (unless that behavior is disabled via props).

The modal component uses a [Page Header](/page-headers.html) internally. The `previousPageUrl`, `previousPageTitle`, and `buttons` props are passed to that Page Header. Additionally, the `mx-modal` component has seven slots for content:

- &bull; The default, unnamed slot is for the main modal content.
- &bull; `card` - This content will appear in a card-like container with rounded corners.
- &bull; `header-left` - Place heading text in this slot.
- &bull; `header-right` - This contains a Close button unless overridden.
- &bull; `header-bottom` - This slot is for content that should appear below the header text, such as tabs.
- &bull; `footer-left` - This slot contains the previous page link (if the `previousPageUrl` prop is provided).
- &bull; `footer-right` - If the `buttons` prop is provided, this slot contains those buttons by default.

On small screens, the modal will fill the screen, except for a 24-px margin at the top. On larger screens, the max dimensions are based on whether the `large` prop is set. If `large` is `true`, the modal will stretch to nearly fill the entire page (with a 40px margin); otherwise, the max dimensions are 800x600px.

### Scrolling modal with buttons and a previous-page link

<!-- #region modals-1 -->
<section class="mds">
  <div class="flex flex-col items-start space-y-20 mt-20">
  <mx-checkbox :value="isALarge" @input="isALarge = !isALarge" label-name="Large modal"></mx-checkbox>
  <mx-button class="mt-20" @click="isOpenA = true">Open Modal</mx-button>
  </div>
  <mx-modal
    :is-open="isOpenA"
    :buttons.prop="[
      { label: 'Primary', onClick: () => isOpenA = false },
      { label: 'Secondary', onClick: () => isOpenA = false },
      { label: 'Tertiary', onClick: () => isOpenA = false },
    ]"
    :large="isALarge"
    previous-page-url="#"
    previous-page-title="Home"
    @mxClose="isOpenA = false"
  >
    <div slot="header-left">Header</div>
    <div slot="card">
      <p class="mt-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut aliquam nisl. Phasellus mollis, nulla sed tempus blandit, sapien tortor scelerisque justo, ut tincidunt ligula augue at eros. Vivamus ut purus ut enim feugiat congue vulputate non metus. Donec quis erat eleifend, semper est non, elementum eros. Maecenas semper, mauris vel tempor fringilla, nibh lectus molestie lacus, vitae efficitur lorem nisl posuere risus. Sed sit amet tristique arcu, in rutrum dui. Suspendisse aliquam suscipit metus sed malesuada. Sed sodales hendrerit risus, eu dignissim nunc imperdiet ac.
      </p>
      <p>
        Curabitur sollicitudin purus in urna varius blandit. Etiam bibendum lorem eu risus volutpat blandit. Pellentesque in ullamcorper felis. Nullam congue pellentesque mi id molestie. Vestibulum sit amet dignissim magna. Curabitur diam risus, finibus sit amet neque in, congue feugiat est. Nam tristique vel neque et scelerisque. Etiam malesuada, metus nec dapibus faucibus, purus lorem varius massa, et gravida libero erat sed metus. Fusce arcu neque, imperdiet id posuere id, mollis id justo. Proin elementum, dui eget tristique sagittis, odio sapien convallis turpis, congue rutrum velit sapien venenatis dolor.
      </p>
      <p>
        Etiam porta metus sed gravida iaculis. Curabitur consectetur semper massa vel sodales. Integer nisi libero, molestie a tortor sed, dapibus faucibus tellus. Vivamus quis augue mollis, rutrum metus eget, lobortis orci. Praesent rhoncus nisl et ante dignissim dapibus. Donec ullamcorper non augue non vehicula. Praesent gravida hendrerit ultricies. Maecenas sit amet gravida orci, at molestie purus. Aliquam mauris nisl, pretium vehicula dui eget, laoreet tincidunt sem. In venenatis mauris a tincidunt eleifend. Nullam sollicitudin eros vitae elementum dapibus. Sed accumsan quis eros vitae molestie.
      </p>
      <p>
        Donec et posuere mi, at rhoncus velit. Mauris vehicula bibendum magna quis luctus. Aenean ut enim ac sapien bibendum sodales id at nisl. Cras placerat orci quam, et lobortis eros aliquam nec. Suspendisse efficitur sollicitudin ex. Donec sed pellentesque nisl. Aenean volutpat nunc eu lacus euismod egestas.
      </p>
      <p>
        Etiam ut elit nec tellus pharetra varius. Morbi volutpat quam vitae velit facilisis bibendum. Morbi libero risus, ultricies a nisi ullamcorper, mollis sollicitudin est. Maecenas odio erat, faucibus sit amet libero at, rhoncus congue est. Morbi sodales orci ut nisi convallis, vitae ultrices odio venenatis. Cras iaculis nunc nec tellus convallis mollis. Sed semper nibh eget lorem bibendum, sed tempus ipsum placerat. Etiam euismod libero non nunc consequat, eu egestas est consectetur. Praesent hendrerit magna sed blandit accumsan. Nullam laoreet quam nec ex eleifend, nec consectetur elit auctor. Suspendisse scelerisque metus in sagittis mattis. Mauris pretium pulvinar elit eu pharetra. Nam eu hendrerit enim. Duis ultricies egestas consequat.
      </p>
      <p>
        Donec et posuere mi, at rhoncus velit. Mauris vehicula bibendum magna quis luctus. Aenean ut enim ac sapien bibendum sodales id at nisl. Cras placerat orci quam, et lobortis eros aliquam nec. Suspendisse efficitur sollicitudin ex. Donec sed pellentesque nisl. Aenean volutpat nunc eu lacus euismod egestas.
      </p>
      <p>
        Etiam ut elit nec tellus pharetra varius. Morbi volutpat quam vitae velit facilisis bibendum. Morbi libero risus, ultricies a nisi ullamcorper, mollis sollicitudin est. Maecenas odio erat, faucibus sit amet libero at, rhoncus congue est. Morbi sodales orci ut nisi convallis, vitae ultrices odio venenatis. Cras iaculis nunc nec tellus convallis mollis. Sed semper nibh eget lorem bibendum, sed tempus ipsum placerat. Etiam euismod libero non nunc consequat, eu egestas est consectetur. Praesent hendrerit magna sed blandit accumsan. Nullam laoreet quam nec ex eleifend, nec consectetur elit auctor. Suspendisse scelerisque metus in sagittis mattis. Mauris pretium pulvinar elit eu pharetra. Nam eu hendrerit enim. Duis ultricies egestas consequat.
      </p>
      <p>
        Donec et posuere mi, at rhoncus velit. Mauris vehicula bibendum magna quis luctus. Aenean ut enim ac sapien bibendum sodales id at nisl. Cras placerat orci quam, et lobortis eros aliquam nec. Suspendisse efficitur sollicitudin ex. Donec sed pellentesque nisl. Aenean volutpat nunc eu lacus euismod egestas.
      </p>
      <p>
        Etiam ut elit nec tellus pharetra varius. Morbi volutpat quam vitae velit facilisis bibendum. Morbi libero risus, ultricies a nisi ullamcorper, mollis sollicitudin est. Maecenas odio erat, faucibus sit amet libero at, rhoncus congue est. Morbi sodales orci ut nisi convallis, vitae ultrices odio venenatis. Cras iaculis nunc nec tellus convallis mollis. Sed semper nibh eget lorem bibendum, sed tempus ipsum placerat. Etiam euismod libero non nunc consequat, eu egestas est consectetur. Praesent hendrerit magna sed blandit accumsan. Nullam laoreet quam nec ex eleifend, nec consectetur elit auctor. Suspendisse scelerisque metus in sagittis mattis. Mauris pretium pulvinar elit eu pharetra. Nam eu hendrerit enim. Duis ultricies egestas consequat.
      </p>
    </div>
  </mx-modal>
</section>
<!-- #endregion modals-1 -->

<<< @/vuepress/components/modals.md#modals-1

### Modal with input, custom slot content, and requires a button click to close

<!-- #region modals-2 -->
<section class="mds">
  <mx-button class="mt-20" @click="isOpenB = true">Open Modal</mx-button>
  <mx-modal
    :is-open="isOpenB"
    :close-on-escape.prop="false"
    :close-on-outside-click.prop="false"
  >
    <div slot="header-left">Header</div>
    <div slot="header-right"></div>
    <p class="mt-0">
      The first focusable element is focused when the modal opens.
    </p>
    <p class="mt-0">
      <mx-input label="Name"></mx-input>
    </p>
    <div slot="footer-left">
      This modal can only be closed by clicking the Okay button.
    </div>
    <div slot="footer-right" class="caption1">
      <mx-button xl @click="isOpenB = false">Okay</mx-button>
    </div>
  </mx-modal>
</section>
<!-- #endregion modals-2 -->

<<< @/vuepress/components/modals.md#modals-2

### Modal that opens another modal

<!-- #region modals-3 -->
<section class="mds">
  <mx-button class="mt-20" @click="isOpenC = true">Open Modal</mx-button>
  <mx-modal
    :is-open="isOpenC"
    @mxClose="isOpenC = false"
  >
    <div slot="header-left">Header</div>
    <p class="mt-0">
      Modals can stack.  Click the button to open another modal on top of this one.
    </p>
    <mx-button @click="isOpenD = true">Open Modal</mx-button>
    <mx-modal
      :is-open="isOpenD"
      @mxClose="isOpenD = false"
    >
      <div slot="header-left">Header</div>
      <p>Pressing <kbd>Esc</kbd> only closes the top modal.</p>
    </mx-modal>
  </mx-modal>
</section>
<!-- #endregion modals-3 -->

<<< @/vuepress/components/modals.md#modals-3

### Modal with tabs and content class

<!-- #region modals-4 -->
<section class="mds">
  <mx-button class="mt-20" @click="isOpenE = true">Open Modal</mx-button>
  <mx-modal
    :is-open="isOpenE"
    @mxClose="isOpenE = false"
    content-class="bg-modal-card"
  >
    <div slot="header-left">Header</div>
    <mx-tabs
      slot="header-bottom"
      :tabs.prop="[
        { label: 'Home' },
        { label: 'Favorites' },
        { label: 'Search' },
      ]"
      :value="activeTab"
      @mxChange="e => activeTab = e.detail"
    />
    <mx-tab-content :value="activeTab" index="0">
      <p>This is the Home tab.</p>
    </mx-tab-content>
    <mx-tab-content :value="activeTab" index="1">
      <p>This is the Favorites tab.</p>
    </mx-tab-content>
    <mx-tab-content :value="activeTab" index="2">
      <p>This is the Search tab.</p>
    </mx-tab-content>
  </mx-modal>
</section>
<!-- #endregion modals-4 -->

<<< @/vuepress/components/modals.md#modals-4

### Properties

| Property              | Attribute                | Description                                                                                                                                                   | Type             | Default  |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| `buttons`             | --                       | An array of prop objects for buttons to display in the button tray. Use the `label` property to specify the button's inner text.                              | `IModalButton[]` | `[]`     |
| `closeOnEscape`       | `close-on-escape`        | If set to false, pressing Escape will not close the modal.                                                                                                    | `boolean`        | `true`   |
| `closeOnOutsideClick` | `close-on-outside-click` | If set to false, clicking the backdrop will not close the modal.                                                                                              | `boolean`        | `true`   |
| `contentClass`        | `content-class`          | Additional classes for the inner scrolling container.                                                                                                         | `string`         | `''`     |
| `isOpen`              | `is-open`                | Toggle the modal                                                                                                                                              | `boolean`        | `false`  |
| `large`               | `large`                  | Set to true to stretch the modal to nearly fill the width and height of the page (on desktop-sized screens). Otherwise, the maximum dimensions are 800x600px. | `boolean`        | `false`  |
| `previousPageTitle`   | `previous-page-title`    | The text to display for the previous page link                                                                                                                | `string`         | `'Back'` |
| `previousPageUrl`     | `previous-page-url`      | The URL for the previous page link                                                                                                                            | `string`         | `''`     |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#modals

<script>
export default {
  data() {
    return {
      isALarge: false,
      isOpenA: false,
      isOpenB: false,
      isOpenC: false,
      isOpenD: false,
      isOpenE: false,
      activeTab: 0,
    }
  },
  methods: {
    clickHandler() {
      console.log('Button clicked!')
    }
  }
}
</script>
