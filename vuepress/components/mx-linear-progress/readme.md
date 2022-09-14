# mx-linear-progress



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                    | Description                                                                                                                       | Type     | Default |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `appearDelay`              | `appear-delay`               | Delay the appearance of the indicator for this many milliseconds                                                                  | `number` | `0`     |
| `simulateProgressDuration` | `simulate-progress-duration` | If provided, the indicator will simulate progress toward 99% over the given duration (milliseconds).                              | `number` | `null`  |
| `value`                    | `value`                      | The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. | `number` | `null`  |


## Dependencies

### Used by

 - [mx-table](../mx-table)

### Graph
```mermaid
graph TD;
  mx-table --> mx-linear-progress
  style mx-linear-progress fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


