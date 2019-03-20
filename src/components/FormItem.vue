<template>
<div>
    <label >{{label}}: <input v-model="value" :name="name"></label>
</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  }
};
</script>
