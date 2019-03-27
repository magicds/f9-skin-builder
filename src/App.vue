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


