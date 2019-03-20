<template>
  <div style="width:200px;">
    <label>
      {{label}}:
      <!-- <input v-model="value" :name="name"> -->
      <ColorPicker :color="value" v-model="value"/>
    </label>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";
export default {
  components: {
    ColorPicker
  },
  props: {
    rule: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      label: this.rule.name,
      value: this.rule.value,
      name: this.rule.key
    };
  },
  watch: {
    value() {
      this.rule.value = this.value;
    }
  }
};
</script>
