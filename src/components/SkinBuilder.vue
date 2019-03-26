<template>
  <div class="skin-builder">
    <div v-if="baseRules.length" class="base-reles">
      <RuleItem v-for="(rule, index) in baseRules" :key="index" :rule="rule"></RuleItem>
    </div>
    <hr>
    <div v-if="advancedRules.length" class="ext-rules">
      <RuleItem v-for="(rule, index) in advancedRules" :key="index" :rule="rule"></RuleItem>
    </div>
    <hr>
    <button @click="downloadSkin" :disabled="!output">下载皮肤文件</button>
    <pre>{{output}}</pre>
    <div class="preview" v-if="previewUrl">
      <iframe ref="previewIframe" :src="previewUrl" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script>
import lessRender from "./lib/lessRender.js";
import download from "./lib/download.js";
import RuleItem from "./RuleItem";

export default {
  name: "skin-builder",
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
    },
    previewUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return this.genderData();
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
    genderData() {
      const delcares = this.baseRules.concat(this.advancedRules);
      const ruleMap = new Map();
      delcares.forEach(rule => {
        ruleMap.set(rule.key, rule);
      });
      delcares.forEach(rule => {
        if (/^@/.test(rule.value)) {
          rule.refer = ruleMap.get(rule.value);
        }
      });
      return {
        ruleMap,
        delcares,
        output: ""
      };
    },
    updateProps() {
        
    },
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
<style lang="less">
.skin-builder {
  height: 100vh;
  position: relative;
  .base-reles,
  .ext-rules {
    display: flex;
    width: 360px;
    padding-left: 10px;
  }
  .base-reles {
    flex-wrap: nowrap;
    .rule-item {
      flex-grow: 1;
    }
  }
  .ext-rules {
    flex-wrap: wrap;
    .rule-item {
      flex-basis: 33.33%;
      margin-bottom: 6px;
    }
  }
}
.preview {
  position: absolute;
  top: 0;
  right: 0;
  left: 380px;
  height: 100%;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.15);
}
</style>