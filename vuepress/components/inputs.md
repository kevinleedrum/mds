# Inputs & Textareas

The `mx-input` component serves as both a single-line and multi-line text field. Optional elements
include icons, assistive text, and a label.

The icons for Moxi Design System are from [https://phosphoricons.com/](https://phosphoricons.com/).
Icons that are embedded in the design system are also available.

## `mc-input`

Hooray, this is the new input.

## Inputs

<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10">
    <div class="my-2">
      <h6 class="emphasis mb-10">Regular</h6>
      <mc-input type="text" label="Label" placeholder="Placeholder"></mc-input>
    </div>
    <div class="my-2">
      <h6 class="emphasis mb-10">With Instructions</h6>
      <mc-input type="text" label="Label" placeholder="Placeholder" instructions="These are instructions..."></mc-input>
    </div>
    <div class="my-2">
      <h6 class="emphasis mb-10">Required</h6>
      <mc-input type="text" label="Label" placeholder="Placeholder" instructions="This is a required field." required></mc-input>
    </div>
    <div class="my-2">
      <h6 class="emphasis mb-10">Error State</h6>
      <mc-input type="text" label="Label" placeholder="Placeholder" error error-msg="This is an error..."></mc-input>
    </div>
    <div class="my-2">
      <h6 class="emphasis mb-10">Disabled</h6>
      <mc-input type="text" label="Label" placeholder="Placeholder" disabled></mc-input>
    </div>
    <div class="my-2">
      <h6 class="emphasis mb-10">Read Only</h6>
      <mc-input type="text" label="Label" placeholder="Placeholder" value="Read Only" readonly></mc-input>
    </div>
  </div>
</section>

## Search Input

<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10">
    <div class="my-2">
      <h6 class="emphasis mb-10">Regular</h6>
      <mc-input type="search" label="Label" placeholder="Placeholder" instructions="Please use the input above to search." search></mc-input>
    </div>
    <div class="my-2">
      <h6 class="emphasis mb-10">Disabled</h6> 
      <mc-input type="search" label="Label" placeholder="Placeholder" instructions="Please use the input above to search." search disabled></mc-input>
    </div>
  </div>
</section>

## File Upload

<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10">
    <div class="my-2">
      <h6 class="emphasis mb-10">Regular</h6>
      <mc-input type="file" label="Label" placeholder="Placeholder" instructions="Please use the input above to search."></mc-input>
    </div>
    <div class="my-2">
      <h6 class="emphasis mb-10">Disabled</h6>
      <mc-input type="file" label="Label" placeholder="Placeholder" instructions="Please use the input above to search." disabled></mc-input>
    </div>
    <div class="my-2">
      <h6 class="emphasis mb-10">Error State</h6>
      <mc-input type="file" label="Label" placeholder="Placeholder" instructions="Please use the input above to search." error error-msg="Your file input haz error'd, my friend."></mc-input>
    </div>
  </div>
</section>

## Deprecated MDS Inputs & TextAreas

### Standard Input

<br />
<section class="mds">
  <!-- #region text-inputs -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-40">
    <div>
      <strong>Regular</strong>
      <div class="my-20">
        <mx-input label="Label" placeholder="Placeholder"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Floating Label" float-label></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Left Icon" left-icon="ph-apple-logo"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Floating Label & Left Icon" float-label left-icon="ph-apple-logo"></mx-input>
      </div>
      <div class="my-20">
        <mx-input
          label="Label & Clickable Right Icons"
          :right-icon.prop="[
            { icon: 'ph-x', ariaLabel: 'Cancel', onClick: clickHandler },
            { icon: 'ph-check', ariaLabel: 'OK', onClick: clickHandler },
          ]"
        />
      </div>
      <div class="my-20">
        <mx-input label="Label & Assistive Text" assistive-text="Helpful text about input"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Error" :value="inputValue" error assistive-text="Error message"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Disabled" assistive-text="This input is disabled" disabled :value="inputValue"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Read-only" assistive-text="This input is read-only" readonly :value="inputValue" @input="inputValue = $event.target.value"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Suffix" suffix="SQFT" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input maxlength="100" label="Label" assistive-text="This input has a maxlength attribute" :value="inputValue" @input="inputValue = $event.target.value"></mx-input>
      </div>
    </div>
    <div>
      <strong>Dense</strong>
      <div class="my-20">
        <mx-input label="Label" placeholder="Placeholder" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Floating Label" float-label dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Left Icon" left-icon="ph-apple-logo" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Floating Label & Left Icon" float-label left-icon="ph-apple-logo" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input
          label="Label & Clickable Right Icons"
          :right-icon.prop="[
            { icon: 'ph-x', ariaLabel: 'Cancel', onClick: clickHandler },
            { icon: 'ph-check', ariaLabel: 'OK', onClick: clickHandler },
          ]"
          dense
        />
      </div>
      <div class="my-20">
        <mx-input label="Label & Assistive Text" assistive-text="Helpful text about input" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Error" :value="inputValue" error assistive-text="Error message" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Disabled" assistive-text="This input is disabled" disabled :value="inputValue" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Read-only" assistive-text="This input is read-only" readonly dense :value="inputValue" @input="inputValue = $event.target.value"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Suffix" suffix="SQFT" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input maxlength="100" label="Label" assistive-text="This input has a maxlength attribute" dense :value="inputValue" @input="inputValue = $event.target.value"></mx-input>
      </div>
    </div>
  </div>
  <!-- #endregion text-inputs -->
</section>

<<< @/vuepress/components/inputs.md#text-inputs

### Text Area

<br />
<section class="mds">
  <!-- #region textareas -->
  <mx-input label="Label" placeholder="Placeholder" textarea assistive-text="This textarea has a height of 100px" textarea-height="100px"></mx-input>
  <mx-input class="mt-40" label="Label & Error" textarea error assistive-text="Error message"></mx-input>
  <mx-input class="my-40" label="Floating Label" textarea float-label maxlength="255" assistive-text="This textarea has a maxlength and really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really long assistive text"></mx-input>
  <!-- #endregion textareas -->
</section>

### Click-to-edit inputs with confirmation

The `mx-confirm-input` component wraps the `mx-input` component, and provides additional edit-in-place behaviors.

- If a `value` is present, the input has no border or background color when not hovered or focused.
- If <kbd>Escape</kbd> is pressed, or if the <i class="mds-x"></i> icon is clicked, then changes inside the input are discarded.
- If <kbd>Enter</kbd> is pressed, or if the <i class="mds-check"></i> icon is clicked, then the `value` is updated and an `input` event is fired.

<section class="mds">
  <div class="space-y-20 my-40">
    <!-- #region confirm-input -->
    <mx-confirm-input placeholder="Placeholder" value="Click to edit this value." />
    <mx-confirm-input float-label label="Label" value="" />
    <mx-confirm-input disabled el-aria-label="Disabled input" value="This is a value, but the input is disabled." />
    <!-- #endregion confirm-input -->
  </div>
</section>

<<< @/vuepress/components/inputs.md#confirm-input

### Properties

| Property              | Attribute               | Description                                                                                                                                          | Type                      | Default     |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------- |
| `assistiveText`       | `assistive-text`        |                                                                                                                                                      | `string`                  | `undefined` |
| `dense`               | `dense`                 |                                                                                                                                                      | `boolean`                 | `false`     |
| `disabled`            | `disabled`              |                                                                                                                                                      | `boolean`                 | `false`     |
| `elAriaLabel`         | `el-aria-label`         | The aria-label attribute for the inner input element.                                                                                                | `string`                  | `undefined` |
| `error`               | `error`                 |                                                                                                                                                      | `boolean`                 | `false`     |
| `floatLabel`          | `float-label`           |                                                                                                                                                      | `boolean`                 | `false`     |
| `hideCharacterCount`  | `hide-character-count`  | Set to `true` to hide the character count when a `maxlength` is set.                                                                                 | `boolean`                 | `false`     |
| `inputId`             | `input-id`              | The `id` attribute for the text input                                                                                                                | `string`                  | `undefined` |
| `label`               | `label`                 | Text for the label element                                                                                                                           | `string`                  | `undefined` |
| `labelClass`          | `label-class`           |                                                                                                                                                      | `string`                  | `''`        |
| `leftIcon`            | `left-icon`             | The class name of the icon to show on the left side of the input, _or_ an array of objects specifying an `icon`, `ariaLabel`, and `onClick` handler  | `MxInputIcon[] \| string` | `undefined` |
| `maxlength`           | `maxlength`             |                                                                                                                                                      | `number`                  | `undefined` |
| `name`                | `name`                  | The `name` attribute for the text input                                                                                                              | `string`                  | `undefined` |
| `outerContainerClass` | `outer-container-class` |                                                                                                                                                      | `string`                  | `''`        |
| `placeholder`         | `placeholder`           | Placeholder text for the input. This will be ignored if `floatLabel` is `true`.                                                                      | `string`                  | `undefined` |
| `readonly`            | `readonly`              |                                                                                                                                                      | `boolean`                 | `false`     |
| `rightIcon`           | `right-icon`            | The class name of the icon to show on the right side of the input, _or_ an array of objects specifying an `icon`, `ariaLabel`, and `onClick` handler | `MxInputIcon[] \| string` | `undefined` |
| `suffix`              | `suffix`                | Text shown to the right of the input value                                                                                                           | `string`                  | `undefined` |
| `textarea`            | `textarea`              | Display a multi-line `textarea` instead of an `input`                                                                                                | `boolean`                 | `false`     |
| `textareaHeight`      | `textarea-height`       |                                                                                                                                                      | `string`                  | `'250px'`   |
| `type`                | `type`                  | The `type` attribute for the text input                                                                                                              | `string`                  | `'text'`    |
| `value`               | `value`                 |                                                                                                                                                      | `string`                  | `undefined` |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#inputs

<script>
export default {
  data() {
    return {
      inputValue: 'Input text'
    }
  },
  methods: {
    clickHandler() {
      console.log('Icon clicked!')
    },
  }
}
</script>
