<template>
  <div>
    <label>
      {{label}}:
      <input v-model="value" :name="name">
    </label>
  </div>
</template>

<script>
export default {
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
  }
};
</script>
