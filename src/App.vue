<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="baseRules.length">
      <FormItem v-for="(rule, index) in baseRules" :key="index" :rule="rule"></FormItem>
    </div>
    <hr>
    <div v-if="advancedRules.length">
      <FormItem v-for="(rule, index) in advancedRules" :key="index" :rule="rule"></FormItem>
    </div>
    <hr>
    <pre>{{output}}</pre>
  </div>
</template>

<script>
import lessRender from "./components/lib/lessRender.js";
import FormItem from './components/FormItem';

export default {
  name: "app",
  components: {
    FormItem
  },
  props: {
    baseRules: {
      type: Array,
      default: () => []
    },
    advancedRules: {
      type: Array,
      default: () => []
    },
    less: {
      type: String,
      default: ""
    }
  },
  data() {
    const delcares = this.baseRules.concat(this.advancedRules);
    const ruleMap = new Map();
    delcares.forEach(rule => {
      ruleMap.set(rule.key, rule);
    });
    return {
      ruleMap,
      delcares,
      output: ""
    };
  },
  computed: {
    input() {
      return this.delcares
        .map(rule => {
          return `${rule.key}: ${rule.value}`;
        })
        .join(";\n") + ';\n';
    }
  },
  mounted() {
    this.renderStyle();
  },
  watch: {
    less() {
      this.renderStyle();
    },
    input() {
      this.renderStyle();
    },
    output() {
      this.$emit("change", this.output);
    }
  },
  methods: {
    renderStyle() {
      const t = this.input + this.less;
      console.log(t);
      return lessRender(t)
        .then(res => {
          this.output = res.css;
        })
        .catch(err => {
          this.output = "";
          console.error(err);
        });
    },
    getFormData() {
      const data = { base: [], advanced: [] };

      // this.rules.map(rule => {});
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
