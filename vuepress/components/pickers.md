# Pickers

## Time Pickers

The `mx-time-picker` component allows for time entry that is independent of the date. It accepts a string `value` in the form of `hh:mm` (24-hour time), which matches the behavior of the native [`<input type="time">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time).

Internally, the component uses an `<input type="time">` if it is [supported by the browser](https://caniuse.com/input-datetime). If it is not supported, a text input is used. This fallback text input attempts to parse and reformat the time string entered by the user. If the entered text is not a valid string, the `error` prop automatically changes to `true`.

The displayed time format (12-hour or 24-hour) is based on the browser language/locale settings.

The component emits `input` events (via the internal `input` element), so the updated `hh:mm` value can be read from `InputEvent.target.value`.

<!-- #region time-pickers -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
    <div class="space-y-20">
      <strong>Regular Label</strong>
      <mx-time-picker label="Time" assistive-text="This is assistive text" />
    </div>
    <div class="space-y-20">
      <strong>Regular Label - Dense</strong>
      <mx-time-picker label="Time" dense assistive-text="This is assistive text" />
    </div>
    <div class="space-y-20">
      <strong>Floating Label</strong>
      <mx-time-picker label="Time" float-label />
    </div>
    <div class="space-y-20">
      <strong>Floating Label - Dense</strong>
      <mx-time-picker label="Time" dense float-label />
    </div>
    <div class="space-y-20">
      <strong>No Label</strong>
      <mx-time-picker :value="selectedTime" @input="selectedTime = $event.target.value" />
    </div>
    <div class="space-y-20">
      <strong>No Label - Dense</strong>
      <mx-time-picker dense :value="selectedTime" @input="selectedTime = $event.target.value" />
    </div>
    <div class="space-y-20">
      <strong>Disabled</strong>
      <mx-time-picker disabled label="Time" :value="selectedTime" />
    </div>
    <div class="space-y-20">
      <strong>Disabled - Dense</strong>
      <mx-time-picker disabled label="Time" dense :value="selectedTime" />
    </div>
    <div class="space-y-20">
      <strong>Error</strong>
      <mx-time-picker error label="Time" :value="selectedTime" assistive-text="This is assistive text" @input="selectedTime = $event.target.value" />
    </div>
    <div class="space-y-20">
      <strong>Error - Dense</strong>
      <mx-time-picker error label="Time" dense :value="selectedTime" assistive-text="This is assistive text" @input="selectedTime = $event.target.value" />
    </div>
  </div>
</section>
<!-- #endregion time-pickers -->

<<< @/vuepress/components/pickers.md#time-pickers

### Time Picker Properties

| Property        | Attribute        | Description                                       | Type      | Default     |
| --------------- | ---------------- | ------------------------------------------------- | --------- | ----------- |
| `ariaLabel`     | `aria-label`     |                                                   | `string`  | `undefined` |
| `assistiveText` | `assistive-text` | Helpful text to show below the picker             | `string`  | `undefined` |
| `dense`         | `dense`          |                                                   | `boolean` | `false`     |
| `disabled`      | `disabled`       |                                                   | `boolean` | `false`     |
| `error`         | `error`          |                                                   | `boolean` | `false`     |
| `floatLabel`    | `float-label`    |                                                   | `boolean` | `false`     |
| `inputId`       | `input-id`       | The `id` attribute for the internal input element | `string`  | `undefined` |
| `label`         | `label`          |                                                   | `string`  | `undefined` |
| `name`          | `name`           |                                                   | `string`  | `undefined` |
| `value`         | `value`          | The time in 24-hour hh:mm format                  | `string`  | `undefined` |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#pickers

<script>
export default {
  data() {
    return {
      selectedTime: '23:59'
    }
  }
}
</script>