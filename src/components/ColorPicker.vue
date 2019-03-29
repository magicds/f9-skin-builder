<template>
  <div class="color-picker" ref="colorpicker">
    <slot></slot>
    <div class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()">
      <span class="current-color-value">{{colorValue.toLowerCase()}}</span>
      <label class="current-color-label">{{label}}</label>
    </div>
    <Chrome class="color-picker-chrome" :value="colors" @input="updateFromPicker" v-if="displayPicker" :disableAlpha="disableAlpha"/>
  </div>
</template>

<script>
import { Chrome } from "vue-color";
export default {
  components: {
    Chrome
  },
  props: {
    // 颜色值
    color: {
      type: String,
      default: ""
    },
    // 展示名称
    label: {
      type: String,
      default: ""
    },
    // 联动的颜色
    referColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      disableAlpha: true,
      colors: {
        hex: "#000000"
      },
      colorValue: "",
      displayPicker: false
    };
  },
  mounted() {
    this.setColor(this.color || "#000000");
    this.setStyle();
  },
  methods: {
    setStyle() {
      const hex = this.color;
      if (hex[0] != "#") return;
      const rgb = [0, 1, 2].map((v, i) => {
        return parseInt(hex.substr(i * 2 + 1, 2), 16) || 0;
      });
      const dropShadow = `drop-shadow(2px 2px 6px rgba( ${rgb.join(",")} ,.15)`;

      this.$refs.colorpicker.style.setProperty("--color", hex);
      this.$refs.colorpicker.style.setProperty("--dropShadow", dropShadow);
      this.$refs.colorpicker.style.setProperty("--red", rgb[0]);
      this.$refs.colorpicker.style.setProperty("--green", rgb[1]);
      this.$refs.colorpicker.style.setProperty("--blue", rgb[2]);
    },
    isValid(color) {
      if (!this.disableAlpha) return true;
      return /^#[0-9a-f]{6}$/i.test(color);
    },
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) == "#") {
        this.colors = {
          hex: color.substr(0, 7)
        };
      } else if (color.slice(0, 4) == "rgba") {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
          hex =
            "#" +
            (
              (1 << 24) +
              (parseInt(rgba[0]) << 16) +
              (parseInt(rgba[1]) << 8) +
              parseInt(rgba[2])
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3]
        };
      }
    },
    showPicker() {
      document.addEventListener("click", this.documentClick);
      this.displayPicker = true;
    },
    hidePicker() {
      document.removeEventListener("click", this.documentClick);
      this.displayPicker = false;
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromPicker(color) {
      // 禁用通道时 ...
      if (this.disableAlpha) {
        color.rgba.a = 1;
      }
      this.colors = color;
      if (color.rgba.a == 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
      }

      this.$emit("change", this.colorValue);
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (!el) return;
      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
    }
  },
  watch: {
    color() {
      this.setColor(this.color || "#000000");
      this.setStyle();
    },
    colorValue(val) {
      if (val) {
        this.updateColors(val);
        this.setStyle();
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style style lang="less" >
.color-picker {
  /* 定义RGB变量 */
  --red: 44;
  --green: 135;
  --blue: 255;
  /* 文字颜色变色的临界值，建议0.5~0.6 */
  --threshold: 0.5;
  /* 深色边框出现的临界值，范围0~1，推荐0.8+*/
  --border-threshold: 0.8;
  --r: calc(var(--red) * 0.2126);
  --g: calc(var(--green) * 0.7152);
  --b: calc(var(--blue) * 0.0722);
  --sum: calc(var(--r) + var(--g) + var(--b));

  --lightness: calc(var(--sum) / 255);

  /**
   * --lightness近似看成亮度，范围0~1，此时，和临界值--threshold做比较：
   * 大于，则正数，和-999999%相乘，会得到一个巨大负数，浏览器会按照合法边界0%渲染，也就是亮度为0，于是颜色是黑色；
   * 小于，则和-999999%相乘，会得到一个巨大的正数，以最大合法值100%渲染，于是颜色是白色；
  */
  color: hsl(0, 0%, calc((var(--lightness) - var(--threshold)) * -999999%));

  --color: #fff;
  position: relative;

  display: block;

  box-sizing: border-box;
  height: 100%;

  &-chrome {
    position: absolute;
    z-index: 1;
    top: calc(100% + 4px);
    left: 0;
    padding-bottom: 2px;

    filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.15));
    filter: var(--dropShadow);

    &:before {
      position: absolute;
      z-index: 2;
      top: -10px;
      left: 10px;

      display: none;

      width: 0;
      height: 0;

      content: "";

      border-right: 10px solid transparent;
      border-bottom: 10px solid #fff;
      border-left: 10px solid transparent;
      border-bottom-color: var(--color);
    }
  }

  .current-color {
    font-size: 12px;
    box-sizing: border-box;
    padding: 4px;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    &-value,
    &-label {
      display: block;
      line-height: 20px;
    }
  }
}
</style>

<style>
.vc-chrome-toggle-btn {
  display: none;
}
</style>

