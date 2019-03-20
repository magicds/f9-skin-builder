<template>
  <div class="input-group color-picker" ref="colorpicker">
    <input type="text" class="input-group-input" :class="{'active':displayPicker}" v-model="colorValue" @focus="showPicker()" @input="updateFromInput" ref="input">
    <span class="input-group-addon color-picker-container">
      <span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()"></span>
      <Chrome :value="colors" @input="updateFromPicker" v-if="displayPicker" :disableAlpha="!0"/>
    </span>
  </div>
</template>

<script>
import { Chrome } from "vue-color";
export default {
  components: {
    Chrome
  },
  props: ["color"],
  data() {
    return {
      colors: {
        hex: "#000000"
      },
      colorValue: "",
      displayPicker: false
    };
  },
  mounted() {
    this.setColor(this.color || "#000000");
    this.setInputFocusStyle();
  },
  methods: {
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    setInputFocusStyle() {
      const hex = this.colorValue;
      if (hex[0] != "#") return;
      const rgb = [0, 1, 2].map((v, i) => {
        return parseInt(hex.substr(i * 2 + 1, 2), 16) || 0;
      });
      const boxShadow = `inset 0 0 4px rgba(${rgb.join(",")},.4)`;
      this.$refs.input.style.setProperty("--borderColor", hex);
      this.$refs.input.style.setProperty("--boxShadow", boxShadow);
    },
    updateColors(color) {
      if (color.slice(0, 1) == "#") {
        this.colors = {
          hex: color
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
    updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker(color) {
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
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
    }
  },
  watch: {
    colorValue(val) {
      if (val) {
        this.updateColors(val);
        this.setInputFocusStyle();
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style>
.color-picker {
  position: relative;
  width: 226px;
  /* display: inline-block; */
}
.vc-chrome {
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 9;
}

.input-group-input {
  padding-left: 4px;
  line-height: 24px;
  height: 26px;
  box-sizing: border-box;
  border: 1px solid #bdbec1;
  /* border-right: none; */
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-sizing: border-box;
  width: 200px;
}

.input-group-input:focus,
.input-group-input.active {
  outline: none;
  border-color: #666;
  border-color: var(--borderColor);
  box-shadow: inset 0 0 4px rgba(28, 102, 169, 0.4);
  box-shadow: var(--boxShadow);
}
.input-group-addon {
  display: inline-block;
  vertical-align: top;
  width: 26px;
  height: 26px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
.current-color {
  display: block;
  height: 100%;
  background-color: #000;
  cursor: pointer;
}
</style>
