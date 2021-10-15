# Tooltips

Tooltips display informative text when users hover over, focus on, or tap an element.

## Standard

To add a standard tooltip to an element, wrap it with the `mx-tooltip` custom element, and use the
`value` prop to set the tooltip text. By default, the tooltip will appear instantly. To add a delay,
use the `appearDelay` prop.

<section class="mds">
  <div class="flex items-center space-x-40">
<!-- #region standard -->
    <mx-tooltip value="Have a nice day">
      <i class="ph-smiley text-h5"></i>
    </mx-tooltip>
    <mx-tooltip value="Print" appear-delay="500">
      <mx-icon-button icon="ph-printer"></mx-icon-button>
    </mx-tooltip>
    <mx-tooltip value="Mute" appear-delay="500">
      <mx-toggle-button icon="ph-microphone-slash" />
    </mx-tooltip>
<!-- #endregion standard -->
  </div>
</section>

<<< @/vuepress/components/tooltips.md#standard

## Extended

The `extended` prop applies some additional styling that is best suited for multiple lines of text.
The max width of the tooltip can also be adjusted using the `maxWidth` prop.

To use markup inside the tooltip, use the `tooltip` slot instead of the `value` prop.

<section class="mds">
  <div class="flex items-center space-x-40">
<!-- #region extended -->
    <mx-tooltip extended value="Twas brillig, and the slithy toves did gyre and gimble in the wabe.">
      <i class="ph-question opacity-50 text-h5"></i>
    </mx-tooltip>
    <mx-tooltip extended max-width="20rem">
      <i class="ph-info opacity-50 text-h5"></i>
      <div slot="tooltip" class="space-y-16">
        <p class="my-0">Spotlight shows the 5 most recent Spotlight posts.</p>
        <p class="my-0">Audiences-specific Spotlight posts will be highlighted in Spotlight in addition to the 5 most recent Spotlight posts Published to Everyone, even if the total Spotlight posts is more than 5.</p>
        <p class="my-0">Only the 5 most recent audience-specific Spotlight posts will be shown to the same Audience.</p>
      </div>
    </mx-tooltip>
<!-- #endregion extended -->
  </div>
</section>

<<< @/vuepress/components/tooltips.md#extended

## Inverted Colors

Set the `inverted` prop to change the text and background colors of the tooltip as seen below.

<section class="mds">
  <div class="flex items-center px-40 py-20 space-x-40 bg-purple-500 rounded-xl">
<!-- #region inverted -->
    <mx-tooltip inverted value="Save">
      <i class="ph-floppy-disk text-white text-h5"></i>
    </mx-tooltip>
    <mx-tooltip inverted extended value="Are you telling me you built a time machine out of a Delorean?">
      <i class="ph-question text-white text-h5"></i>
    </mx-tooltip>
<!-- #endregion inverted -->
  </div>
</section>

<<< @/vuepress/components/tooltips.md#inverted

## Placement

The placement of the tooltip will adjust automatically based on available space. By default, the
tooltip will first attempt to center itself below the anchor element ("bottom" placement). This
preferred placement can be changed via the `placement` prop.

<section class="mds">
<!-- #region placement -->
  <div class="w-208">
    <mx-select label="Placement" :value="placement" @input="placement = $event.target.value" dense>
      <option>top</option>
      <option>top-end</option>
      <option>right-start</option>
      <option>right</option>
      <option>right-end</option>
      <option>bottom-end</option>
      <option>bottom</option>
      <option>bottom-start</option>
      <option>left-end</option>
      <option>left</option>
      <option>left-start</option>
      <option>top-start</option>
    </mx-select>
  </div>
  <mx-tooltip :value="placement" :placement="placement">
    <mx-button xl class="my-40">Hover Me</mx-button>
  </mx-tooltip>
<!-- #endregion placement -->
</section>

<<< @/vuepress/components/tooltips.md#placement

### Properties

| Property       | Attribute       | Description                                                                                                | Type                                                                                                                                                                                           | Default     |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `appearDelay`  | `appear-delay`  | Delay showing the tooltip for this many milliseconds                                                       | `number`                                                                                                                                                                                       | `0`         |
| `extended`     | `extended`      | Increase the padding, add a shadow, and make the corners less rounded (typically for multi-line text)      | `boolean`                                                                                                                                                                                      | `false`     |
| `inverted`     | `inverted`      | Invert the default colors (i.e. dark text on a light background)                                           | `boolean`                                                                                                                                                                                      | `false`     |
| `isOpen`       | `is-open`       | This is typically updated automatically based on events, but may be changed programmatically if necessary. | `boolean`                                                                                                                                                                                      | `false`     |
| `maxWidth`     | `max-width`     | The maximum width of the tooltip (e.g. '20rem')                                                            | `string`                                                                                                                                                                                       | `'10rem'`   |
| `placement`    | `placement`     | The preferred placement of the tooltip, relative to the anchor element.                                    | `"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"` | `'bottom'`  |
| `tooltipClass` | `tooltip-class` | Additional classes to add to the tooltip.                                                                  | `string`                                                                                                                                                                                       | `undefined` |
| `value`        | `value`         | The text to show inside the tooltip. Alternatively, use the `tooltip` slot.                                | `string`                                                                                                                                                                                       | `undefined` |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#tooltips

<script>
export default {
  data() {
    return {
      placement: 'top'
    }
  }
}
</script>
