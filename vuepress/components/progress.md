# Progress Indicators

## Circular

<section class="mds">
<!-- #region circular-progress -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-20">
    <div class="flex flex-col space-y-20">
      <strong>Indeterminate</strong>
      <mx-circular-progress aria-label="Progress"  />
    </div>
    <div class="flex flex-col space-y-20">
      <strong>Determinate</strong>
      <div>
        <mx-circular-progress aria-label="Progress" value="25" />
        <mx-circular-progress aria-label="Progress" value="75" />
        <mx-circular-progress aria-label="Progress" value="100" />
        <mx-circular-progress aria-label="Progress" :value="progress" />
      </div>
    </div>
    <div class="flex flex-col space-y-20">
      <strong>Custom Sizes</strong>
      <div>
        <mx-circular-progress aria-label="Progress" size="1.5rem" />
        <mx-circular-progress aria-label="Progress" size="2rem" :value="progress" />
        <mx-circular-progress aria-label="Progress" size="2.5rem" />
        <mx-circular-progress aria-label="Progress" size="4rem" :value="progress" />
      </div>
    </div>
  </div>
<!-- #endregion circular-progress -->
</section>

<<< @/vuepress/components/progress.md#circular-progress

## Linear

<section class="mds">
<!-- #region linear-progress -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-20">
    <div class="flex flex-col space-y-20">
      <strong>Indeterminate</strong>
      <mx-linear-progress aria-label="Progress" />
    </div>
    <div class="flex flex-col space-y-20">
      <strong>Determinate</strong>
      <div class="space-y-16">
        <mx-linear-progress aria-label="Progress" value="25" />
        <mx-linear-progress aria-label="Progress" value="75" />
        <mx-linear-progress aria-label="Progress" value="100" />
        <mx-linear-progress aria-label="Progress" :value="progress" />
      </div>
    </div>
  </div>
<!-- #endregion linear-progress -->
</section>

<<< @/vuepress/components/progress.md#linear-progress

### Delay Appearance

If you only want to show a progress indicator when a task is taking longer to finish, use the `appear-delay` prop.

<section class="mds">
<!-- #region appear-delay -->
  <div class="h-192 flex flex-col items-center justify-end relative pb-16 border bg-white">
    <mx-linear-progress v-if="isLoading" aria-label="Progress" appear-delay="500" class="absolute top-0" />
    <mx-circular-progress v-if="isLoading" aria-label="Progress" appear-delay="500" class="absolute top-24" />
    <mx-button class="w-160" @click="isLoading = !isLoading">
      {{ isLoading ? 'Stop Loading' : 'Start Loading' }}
    </mx-button>
    <p class="my-8">Progress indicators will appear after 500ms.</p>
  </div>
<!-- #endregion appear-delay -->
</section>

<<< @/vuepress/components/progress.md#appear-delay

### Circular Progress Properties

| Property      | Attribute      | Description                                                                                                                       | Type     | Default  |
| ------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| `appearDelay` | `appear-delay` | Delay the appearance of the indicator for this many milliseconds                                                                  | `number` | `0`      |
| `size`        | `size`         | The value to use for the width and height                                                                                         | `string` | `'3rem'` |
| `value`       | `value`        | The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. | `number` | `null`   |

### Linear Progress Properties

| Property      | Attribute      | Description                                                                                                                       | Type     | Default |
| ------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `appearDelay` | `appear-delay` | Delay the appearance of the indicator for this many milliseconds                                                                  | `number` | `0`     |
| `value`       | `value`        | The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. | `number` | `null`  |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#progress

<script>
export default {
  data() { 
    return {
      progress: 0,
      isLoading: false,
    }
  },
  mounted() {
    setInterval(() => {
      if (this.progress < 100) this.progress += 10
      else this.progress = 0
    }, 500)
  }
}
</script>
