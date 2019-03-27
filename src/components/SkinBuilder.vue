<template>
  <div class="skin-builder">
    <div class="rule-area">
      <h2>主色/辅色</h2>
      <div v-if="baseRules.length" class="base-reles">
        <RuleItem v-for="(rule, index) in baseRules" :key="index" :rule="rule" @change="handleChange"></RuleItem>
      </div>
    </div>

    <div class="rule-area">
      <h2>功能色</h2>
      <div v-if="advancedRules.length" class="ext-rules">
        <RuleItem v-for="(rule, index) in advancedRules" :key="index" :rule="rule" @change="handleChange"></RuleItem>
      </div>
    </div>

    <div class="btns">
      <el-button type="primary" @click="showCode=!showCode" :disabled="!output" size="small">{{showCode ? '隐藏代码' : '显示代码'}}</el-button>
      <el-button type="primary" @click="downloadSkin" :disabled="!output" size="small">下载皮肤文件</el-button>
    </div>

    <pre v-if="showCode"><code ref="code" class="lang-css">{{output}}</code></pre>

    <div class="preview" v-if="previewUrl">
      <iframe ref="previewIframe" :src="previewUrl" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script>
import lessRender from "./lib/lessRender.js";
import download from "./lib/download.js";
import RuleItem from "./RuleItem";
import hljs from "highlight.js/lib/highlight";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("css", css);

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
      this.$emit("build", this.output);
      this.updatePreview();
      this.highlightCode();
    },
    showCode() {
      this.highlightCode();
    },
    baseRules() {
      this.$set(this, "delcares", this.baseRules.concat(this.advancedRules));
    },
    advancedRules() {
      this.$set(this, "delcares", this.baseRules.concat(this.advancedRules));
    }
  },
  methods: {
    highlightCode() {
      if (!this.showCode) return;
      this.$nextTick(() => {
        this.$refs.code && hljs.highlightBlock(this.$refs.code);
      });
    },
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
        output: "",
        showCode: false
      };
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
      return {
        baseRules: removeRefer(this.baseRules),
        advancedRules: removeRefer(this.advancedRules)
      };
      function removeRefer(arr) {
        const data = JSON.parse(JSON.stringify(arr));
        data.forEach(rule => {
          if (rule.refer) {
            rule.refer = null;
            delete rule.refer;
          }
        });
        return data;
      }
    },
    downloadSkin() {
      download(this.output, "skin.css");
    },
    handleChange() {
      this.$emit("change");
    }
  }
};
</script>
<style lang="less">
.skin-builder {
  height: 100vh;
  .rule-area,
  .btns {
    padding: 0 10px;
  }
  .rule-area {
    margin-bottom: 20px;
    > h2 {
      font-size: 14px;
      font-weight: bold;
      color: #3d4b64;
      margin: 0;
    }
  }
  .base-reles,
  .ext-rules {
    display: flex;
    width: 360px;
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

  pre {
    font-size: 12px;
    line-height: 20px;
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