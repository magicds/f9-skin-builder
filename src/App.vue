<template>
  <div class="f9-skin-bulder">
    <div class="toolbar">
      预设:
      <el-select class="preset-select" v-model="currRule" placeholder="请选择" @change="updateFromPreset">
        <el-option-group v-for="group in presetRules" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-option-group>
      </el-select>
      <el-button type="primary" class="preset-save" @click="saveAsPreset">存为预设</el-button>
    </div>
    <SkinBuilder :baseRules="baseRules" :advancedRules="advancedRules" :less="less" :previewUrl="previewUrl"/>
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
        data.baseRules = data.presetMaps[data.currRule].baseRules;
        data.advancedRules = data.presetMaps[data.currRule].advancedRules;
      }

      // less 内容
      const localLessText = localStorage.getItem(SAVE_PREFIX + "--LESSTEXT");
      data.less = localLessText || "";

      // 预览地址
      data.previewUrl = window.__F9_SKIN_BUILDER__.previewUrl;

      return data;
    },
    init() {},
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
        this.$set(this, "baseRules", rules.baseRules);
        this.$set(this, "advancedRules", rules.advancedRules);
      }
    },
    saveAsPreset() {}
  }
};
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  font-size: 13px;
}
.f9-skin-bulder {
  .toolbar {
    padding-top: 10px;
    padding-left: 10px;
    margin-bottom: 10px;
  }
}
</style>


