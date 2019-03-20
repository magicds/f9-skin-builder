<template>
  <div class="skin-builder">
    <div v-if="baseRules.length">
      <RuleItem v-for="(rule, index) in baseRules" :key="index" :rule="rule"></RuleItem>
    </div>
    <hr>
    <div v-if="advancedRules.length">
      <RuleItem v-for="(rule, index) in advancedRules" :key="index" :rule="rule"></RuleItem>
    </div>
    <hr>
    <button @click="downloadSkin" :disabled="!output">下载皮肤文件</button>
    <pre>{{output}}</pre>
    <div class="preview">
      <iframe ref="previewIframe" src="//192.168.118.47/ep93/frame/fui/pages/skinTest/all.html" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script>
import lessRender from "./components/lib/lessRender.js";
import download from "./components/lib/download.js";
import RuleItem from "./components/RuleItem";

export default {
  name: "app",
  components: {
    RuleItem
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
      return (
        this.delcares
          .map(rule => {
            return `${rule.key}: ${rule.value}`;
          })
          .join(";\n") + ";\n"
      );
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
      this.updatePreview();
    }
  },
  methods: {
    updatePreview() {
      this.$refs.previewIframe.contentWindow.postMessage(
        JSON.stringify({
          type: "skinBuild",
          css: this.output
        }),
        "*"
      );
    },
    renderStyle() {
      const t = this.input + this.less;
      return lessRender(t)
        .then(res => {
          this.output = res.css;
        })
        .catch(err => {
          this.output = "";
          console.error(err);
          console.error(
            "error:",
            err.type,
            "error at: ",
            t.substr(err.index, 20)
          );
        });
    },
    getFormData() {
      const data = { base: [], advanced: [] };

      // this.rules.map(rule => {});
    },
    downloadSkin() {
      download(this.output, "skin.css");
    }
  }
};
</script>
<style>
.skin-builder {
  height: 100vh;
  position: relative;
}
.preview {
  position: absolute;
  top: 0;
  right: 0;
  left: 300px;
  height: 100%;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.15);
}
</style>


