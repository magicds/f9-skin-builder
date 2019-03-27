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

    <div class="preview" v-if="previewUrl">
      <iframe ref="previewIframe" :src="previewUrl" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <el-dialog title="查看代码" :visible.sync="showCode" top="50px" width="80%" @open="highlightCode">
      <pre v-if="showCode" :style="'height:'+codeHeight+'px;'"><code ref="code" class="lang-css">{{output}}</code></pre>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="showCode = false" size="small">取 消</el-button>
        <el-button type="primary" size="small">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import lessRender from "./lib/lessRender.js";
import download from "./lib/download.js";
import RuleItem from "./RuleItem";
import hljs from "highlight.js/lib/highlight";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/atom-one-dark.css";
import { debug } from "util";

hljs.registerLanguage("css", css);

export default {
  name: "skin-builder",
  components: {
    RuleItem
  },
  props: {
    rule: {
      type: Object,
      default: () => {
        return {};
      }
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
    // return this.genderData();
    return {
      baseRules: [],
      advancedRules: [],
      output: "",
      showCode: false,
      codeHeight: 0
    };
  },
  mounted() {
    this.updateRules();
    this.renderStyle();
    this.calcHeight();
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
    },
    rule() {
      this.updateRules();
      this.renderStyle();
    }
  },
  computed: {
    delcares() {
      const rule = this.rule;
      return rule.baseRules.concat(rule.advancedRules);
    },
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
  methods: {
    calcHeight() {
      this.codeHeight = window.innerHeight - 210;
    },
    highlightCode() {
      if (!this.showCode) return;
      this.$nextTick(() => {
        if (this.$refs.code) {
          this.$refs.code.textContent = this.output;
          hljs.highlightBlock(this.$refs.code);
        }
      });
    },
    updateRules() {
      const rule = this.rule;
      const delcares = rule.baseRules.concat(rule.advancedRules);
      const ruleMap = new Map();
      delcares.forEach(rule => {
        ruleMap.set(rule.key, rule);
      });
      delcares.forEach(rule => {
        if (/^@/.test(rule.value)) {
          // 存在引用
          rule.refer = ruleMap.get(rule.value);
        }
      });
      this.$set(this, "baseRules", rule.baseRules);
      this.$set(this, "advancedRules", rule.advancedRules);
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
          this.$message.error(
            `【${err.type}】 at "${t.substr(err.index, 20)}"`
          );
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
          if (!rule.refer) return;
          // 存在引用时 还原引用值
          if (rule.refer.value == rule.value) {
            rule.value = rule.refer.key;
          }

          rule.refer = null;
          delete rule.refer;
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
    border-radius: 4px;
    overflow: hidden;
    margin: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    overflow: auto;
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
.el-dialog__body {
  padding: 0 0 20px;
}
</style>