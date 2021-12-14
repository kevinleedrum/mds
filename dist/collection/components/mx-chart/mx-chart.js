import { Component, Host, h, Prop, Element, Watch, Method } from '@stencil/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...(registerables || []));
export class MxChart {
  onDataChange() {
    this.update();
  }
  componentDidLoad() {
    this.update();
  }
  /** Force the chart to rerender. */
  async update() {
    if (!this.canvasEl)
      return;
    if (this.chart)
      this.chart.destroy();
    this.chart = new Chart(this.canvasEl, {
      type: this.type,
      data: this.data,
      options: this.options,
    });
  }
  get chartStyle() {
    return { width: this.width && this.width + 'px', height: this.height && this.height + 'px' };
  }
  render() {
    return (h(Host, { class: "mx-chart relative block", style: this.chartStyle },
      h("canvas", { ref: el => (this.canvasEl = el), role: "img", style: this.chartStyle })));
  }
  static get is() { return "mx-chart"; }
  static get properties() { return {
    "data": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ChartJsData",
        "resolved": "ChartJsData",
        "references": {
          "ChartJsData": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The labels and datasets to render. See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/)."
      }
    },
    "height": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Explicit height in pixels"
      },
      "attribute": "height",
      "reflect": false
    },
    "options": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ChartJsOptions",
        "resolved": "ChartJsOptions",
        "references": {
          "ChartJsOptions": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See the [Chart.js documentation](https://www.chartjs.org/docs/3.6.2/)."
      }
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ChartType",
        "resolved": "\"bar\" | \"bubble\" | \"doughnut\" | \"line\" | \"pie\" | \"polarArea\" | \"radar\" | \"scatter\"",
        "references": {
          "ChartType": {
            "location": "import",
            "path": "chart.js"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The type of chart to render. For mixed charts, set the `type` in the dataset instead."
      },
      "attribute": "type",
      "reflect": false
    },
    "width": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Explicit width in pixels"
      },
      "attribute": "width",
      "reflect": false
    }
  }; }
  static get methods() { return {
    "update": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Force the chart to rerender.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "data",
      "methodName": "onDataChange"
    }, {
      "propName": "options",
      "methodName": "onDataChange"
    }, {
      "propName": "type",
      "methodName": "onDataChange"
    }]; }
}
