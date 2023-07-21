# Pickers

## Date Pickers

The `mx-date-picker` component is used to select a date via text input or calendar selection. It accepts a string `value` in the form of `YYYY-MM-DD`, which matches the behavior of the native [`<input type="date">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date).

Internally, the component uses an `<input type="date">` if it is [supported by the browser](https://caniuse.com/input-datetime). If it is not supported, a text input is used. This fallback text input attempts to parse and reformat the date string entered by the user. If the entered text is not a valid date string, the `error` prop automatically changes to `true`.

The displayed date format is based on the browser language/locale settings.

The component emits `input` events (via the internal `input` element), so the updated `YYYY-MM-DD` value can be read from `InputEvent.target.value`.

<!-- #region date-pickers -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
    <div class="space-y-20">
      <strong>Regular Label</strong>
      <mx-date-picker label="Date" assistive-text="This is assistive text" />
    </div>
    <div class="space-y-20">
      <strong>Regular Label - Dense</strong>
      <mx-date-picker label="Date" dense assistive-text="This is assistive text" />
    </div>
    <div class="space-y-20">
      <strong>Floating Label</strong>
      <mx-date-picker label="Date" float-label />
    </div>
    <div class="space-y-20">
      <strong>Floating Label - Dense</strong>
      <mx-date-picker label="Date" dense float-label />
    </div>
    <div class="space-y-20">
      <strong>No Label</strong>
      <mx-date-picker el-aria-label="Date" :value="selectedDate" @input="selectedDate = $event.target.value" :assistive-text="'The input value is ' + (selectedDate || 'empty')" />
    </div>
    <div class="space-y-20">
      <strong>No Label - Dense</strong>
      <mx-date-picker dense el-aria-label="Date" :value="selectedDate" @input="selectedDate = $event.target.value" :assistive-text="'The input value is ' + (selectedDate || 'empty')" />
    </div>
    <div class="space-y-20">
      <strong>Disabled</strong>
      <mx-date-picker disabled label="Date" :value="selectedDate" />
    </div>
    <div class="space-y-20">
      <strong>Disabled - Dense</strong>
      <mx-date-picker disabled label="Date" dense :value="selectedDate" />
    </div>
    <div class="space-y-20">
      <strong>Error</strong>
      <mx-date-picker error label="Date" :value="selectedDate" assistive-text="This is assistive text" @input="selectedDate = $event.target.value" />
    </div>
    <div class="space-y-20">
      <strong>Error - Dense</strong>
      <mx-date-picker error label="Date" dense :value="selectedDate" assistive-text="This is assistive text" @input="selectedDate = $event.target.value" />
    </div>
  </div>
</section>
<!-- #endregion date-pickers -->

<<< @/vuepress/components/pickers.md#date-pickers

### Min/Max Validation

The date picker's min and max values may be set via the `min` and `max` props (in YYYY-MM-DD format).
To automatically set the `min` or `max` to today's date, you may also set the `allow-past` or `allow-future`
prop to `false`.

The `error` state for the date picker will be automatically set to `true` on blur if the entered date
is outside the valid range. You may also check the `InputEvent.target.validity` for `rangeOverflow` or
`rangeUnderflow` (as long as the browser supports `<input type=date>`).

<!-- #region date-validation -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
    <div class="space-y-20">
      <mx-date-picker label="Date" allow-future="false" assistive-text="Future dates are not allowed" />
    </div>
    <div class="space-y-20">
      <mx-date-picker label="Date" allow-past="false"  assistive-text="Past dates are not allowed" />
    </div>
    <div class="space-y-20">
      <mx-date-picker label="Date" min="2022-01-01" assistive-text="The min date is 2022-01-01" />
    </div>
    <div class="space-y-20">
      <mx-date-picker label="Date" max="2022-01-01"  assistive-text="The max date is 2022-01-01" />
    </div>
  </div>
</section>
<!-- #endregion date-validation -->

<<< @/vuepress/components/pickers.md#date-validation

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
      <mx-time-picker el-aria-label="Time" :value="selectedTime" @input="selectedTime = $event.target.value" :assistive-text="'The value is ' + (selectedTime || 'empty')" />
    </div>
    <div class="space-y-20">
      <strong>No Label - Dense</strong>
      <mx-time-picker dense el-aria-label="Time" :value="selectedTime" @input="selectedTime = $event.target.value" :assistive-text="'The value is ' + (selectedTime || 'empty')" />
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

## Default Current Date/Time Example

Sometimes you will want to default the date and/or time picker to be the current date/time. Here is an example of how to accomplish this in VueJS.

<!-- #start current date/time date-pickers & time-pickers -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
    <div class="space-y-20">
      <strong>Regular Date with Current Date Set</strong>
      <mx-date-picker :value="returnCurrentDate()" label="Date" assistive-text="This is assistive text" />
    </div>
    <div class="space-y-20">
      <strong>Regular Time with Current Time Set</strong>
      <mx-time-picker :value="returnCurrentTime()" label="Time" assistive-text="This is assistive text" />
    </div>
  </div>
</section>
<!-- #start current date/time date-pickers & time-pickers -->

```html
<mx-date-picker :value="returnCurrentDate()" label="Date" assistive-text="This is assistive text" />

<mx-time-picker :value="returnCurrentTime()" label="Time" assistive-text="This is assistive text" />

<script>
  export default {
    methods: {
      returnCurrentDate: () => new Date().toLocaleDateString('en-CA'); // Gives the YYYY-MM-DD Format,
      returnCurrentTime: () => new Date().toLocaleTimeString('en-CA', { hour12: false }); // 24 hour time,
    },
  };
</script>
```

### Date Picker Properties

| Property        | Attribute        | Description                                           | Type      | Default     |
| --------------- | ---------------- | ----------------------------------------------------- | --------- | ----------- |
| `assistiveText` | `assistive-text` | Helpful text to show below the picker                 | `string`  | `undefined` |
| `dense`         | `dense`          |                                                       | `boolean` | `false`     |
| `disabled`      | `disabled`       |                                                       | `boolean` | `false`     |
| `elAriaLabel`   | `el-aria-label`  | The aria-label attribute for the inner input element. | `string`  | `undefined` |
| `error`         | `error`          |                                                       | `boolean` | `false`     |
| `floatLabel`    | `float-label`    |                                                       | `boolean` | `false`     |
| `inputId`       | `input-id`       | The `id` attribute for the internal input element     | `string`  | `undefined` |
| `label`         | `label`          |                                                       | `string`  | `undefined` |
| `name`          | `name`           |                                                       | `string`  | `undefined` |
| `value`         | `value`          | The selected date in YYYY-MM-DD format                | `string`  | `undefined` |

### Time Picker Properties

| Property        | Attribute        | Description                                           | Type      | Default     |
| --------------- | ---------------- | ----------------------------------------------------- | --------- | ----------- |
| `allowFuture`   | `allow-future`   | Set to false to prevent entering a date after today   | `boolean` | `true`      |
| `allowPast`     | `allow-past`     | Set to false to prevent entering a date before today  | `boolean` | `true`      |
| `assistiveText` | `assistive-text` | Helpful text to show below the picker                 | `string`  | `undefined` |
| `dense`         | `dense`          |                                                       | `boolean` | `false`     |
| `disabled`      | `disabled`       |                                                       | `boolean` | `false`     |
| `elAriaLabel`   | `el-aria-label`  | The aria-label attribute for the inner input element. | `string`  | `undefined` |
| `error`         | `error`          |                                                       | `boolean` | `false`     |
| `floatLabel`    | `float-label`    |                                                       | `boolean` | `false`     |
| `inputId`       | `input-id`       | The `id` attribute for the internal input element     | `string`  | `undefined` |
| `label`         | `label`          |                                                       | `string`  | `undefined` |
| `max`           | `max`            | The latest date to accept (in YYYY-MM-DD format)      | `string`  | `undefined` |
| `min`           | `min`            | The earliest date to accept (in YYYY-MM-DD format)    | `string`  | `undefined` |
| `name`          | `name`           |                                                       | `string`  | `undefined` |
| `value`         | `value`          | The selected date in YYYY-MM-DD format                | `string`  | `undefined` |

<script>
export default {
  data() {
    return {
      selectedDate: '2021-12-24',
      selectedTime: '23:59'
    }
  },
  methods: {
    returnCurrentDate: () => new Date().toLocaleDateString('en-CA'), // Gives the YYYY-MM-DD Format,
    returnCurrentTime: () => new Date().toLocaleTimeString('en-CA', { hour12: false }) // 24 hour time,
  }
}
</script>
