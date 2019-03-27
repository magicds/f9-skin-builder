<template>
  <div class="f9-skin-bulder">
    <div class="toolbar">
      预设:
      <el-select class="preset-select" v-model="currRule" placeholder="请选择" @change="updateFromPreset" size="small">
        <el-option-group v-for="group in presetRules" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-option-group>
      </el-select>
      <el-button type="primary" class="preset-save" @click="dialogVisible = true" size="small" :disabled="!!currRule">存为预设</el-button>
    </div>
    <SkinBuilder ref="skinBuilder" :rule="rule" :less="less" :previewUrl="previewUrl" @change="change"/>

    <el-dialog title="输入名称" :visible.sync="dialogVisible" width="30%" @open="resetMyPresetName">
      <el-input v-model="myPresetName" placeholder="请输入名称" size="small"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="saveAsPreset" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SkinBuilder from "./components/SkinBuilder.vue";

const SAVE_PREFIX = "__F9_SKIN_BUILDER__" + __F9_SKIN_BUILDER__.version;

export default {
  name: "app",
  components: {
    SkinBuilder
  },
  data() {
    return this.genderInitData();
  },
  mounted() {
    this.getLessText();
  },
  methods: {
    // 构建初始化值
    genderInitData() {
      // 预设
      const data = this.getPreset();
      const sysPreset = data.presetRules[0];
      // 选中系统第一个预设
      if (sysPreset && sysPreset.options.length) {
        data.currRule = sysPreset.options[0].value;
        data.rule = data.presetMaps[data.currRule];
      }

      // less 内容
      const localLessText = localStorage.getItem(SAVE_PREFIX + "--LESSTEXT");
      data.less = localLessText || "";

      // 预览地址
      data.previewUrl = window.__F9_SKIN_BUILDER__.previewUrl;

      // dialog
      data.dialogVisible = false;

      // myPresetName
      data.myPresetName = "";

      return data;
    },
    // 远端拉取最新的less文件
    getLessText() {
      window
        .httpGet(__F9_SKIN_BUILDER__.lessUrl + "?t=" + +new Date())
        .then(less => {
          if (less != this.less) {
            this.less = less;
            localStorage.setItem(SAVE_PREFIX + "--LESSTEXT", less);
          }
        });
    },
    // 获取预设
    getPreset() {
      const presetMaps = {};
      // 系统预设
      const sysPreset = JSON.parse(
        JSON.stringify(window.__F9_SKIN_BUILDER__.preset)
      );
      const sysPresetArr = [];
      _getPreset(sysPreset, sysPresetArr);

      // 我的预设
      const myPreset = JSON.parse(
        localStorage.getItem(SAVE_PREFIX + "--PRESET")
      );
      const myPresetArr = [];
      _getPreset(myPreset, myPresetArr);

      return {
        presetMaps,
        presetRules: [
          {
            label: "系统预设",
            options: sysPresetArr
          },
          {
            label: "我的预设",
            options: myPresetArr
          }
        ]
      };

      function _getPreset(preset, arr) {
        for (let p in preset) {
          if (Object.prototype.hasOwnProperty.call(preset, p)) {
            arr.push({
              label: preset[p].name,
              value: p
            });
            presetMaps[p] = preset[p].rule;
          }
        }
      }
    },
    updateFromPreset() {
      var rules = this.presetMaps[this.currRule];
      if (rules) {
        // this.baseRules.splice(0,this.baseRules.length,...rules.baseRules);
        // this.advancedRules.splice(0,this.advancedRules.length,...rules.advancedRules);
        rules = JSON.parse(JSON.stringify(rules));
        this.$set(this, "rule", rules);
      }
    },
    saveAsPreset(done) {
      var rule = this.$refs.skinBuilder.getFormData();
      const currPresetId = "myPreset-" + this.presetRules[1].options.length;
      const currPreset = {
        name: this.myPresetName,
        rule
      };
      const presets =
        JSON.parse(localStorage.getItem(SAVE_PREFIX + "--PRESET")) || {};
      presets[currPresetId] = currPreset;
      localStorage.setItem(SAVE_PREFIX + "--PRESET", JSON.stringify(presets));

      // update Preset
      this.addCustomPreset(currPresetId, currPreset);
      this.dialogVisible = false;
    },
    addCustomPreset(id, preset) {
      this.presetRules[1].options.push({
        label: preset.name,
        value: id
      });
      this.presetMaps[id] = preset.rule;
      this.currRule = id;
    },
    resetMyPresetName() {
      this.myPresetName =
        "我的预设-" + (this.presetRules[1].options.length + 1);
    },
    change() {
      this.currRule = "";
    }
  }
};
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #3d4b64;
  line-height: 32px;
  overflow: hidden;
  height: 100%;
}
.f9-skin-bulder {
  position: relative;
  .toolbar {
    padding-top: 10px;
    padding-left: 10px;
    margin-bottom: 10px;
    > * {
      margin-left: 10px;
    }
  }
  .preview {
  }
}
</style>


<style>
/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}

::-webkit-scrollbar-button:end:increment,
::-webkit-scrollbar-button:start:decrement {
  display: block;
}

::-webkit-scrollbar-button:vertical:end:decrement,
::-webkit-scrollbar-button:vertical:start:increment {
  display: none;
}

::-webkit-scrollbar-thumb:horizontal,
::-webkit-scrollbar-thumb:vertical,
::-webkit-scrollbar-track:horizontal,
::-webkit-scrollbar-track:vertical {
  border-color: transparent;
  border-style: solid;
}

::-webkit-scrollbar-track:vertical::-webkit-scrollbar-track:horizontal {
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb {
  min-height: 28px;
  padding-top: 100;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border-radius: 5px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.07);
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25);
}

::-webkit-scrollbar-thumb:active {
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.35);
}

::-webkit-scrollbar-thumb:horizontal,
::-webkit-scrollbar-thumb:vertical,
::-webkit-scrollbar-track:horizontal,
::-webkit-scrollbar-track:vertical {
  border-width: 0;
}

::-webkit-scrollbar-track:hover {
  background-color: rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-track:active {
  background-color: rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.14),
    inset -1px -1px 0 rgba(0, 0, 0, 0.07);
}

.scrollbar-hover::-webkit-scrollbar,
.scrollbar-hover::-webkit-scrollbar-button,
.scrollbar-hover::-webkit-scrollbar-thumb,
.scrollbar-hover::-webkit-scrollbar-track {
  visibility: hidden;
}

.scrollbar-hover:hover::-webkit-scrollbar,
.scrollbar-hover:hover::-webkit-scrollbar-button,
.scrollbar-hover:hover::-webkit-scrollbar-thumb,
.scrollbar-hover:hover::-webkit-scrollbar-track {
  visibility: visible;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
/* IE 滚动条 */
html,
body,
ul,
li,
div,
pre {
  /*三角箭头的颜色*/
  scrollbar-arrow-color: #ccc;
  /*滚动条滑块按钮的颜色*/
  scrollbar-face-color: #ccc;
  /*滚动条整体颜色*/
  scrollbar-highlight-color: #fff;
  /*滚动条阴影*/
  scrollbar-shadow-color: #fff;
  scrollbar-shadow-color: rgba(255, 255, 255, 0.3);
  /*滚动条轨道颜色*/
  scrollbar-track-color: #f2f2f2;
}
</style>
