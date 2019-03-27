<template>
  <div class="rule-item">
    <ColorPicker :color="rule.value" v-model="rule.value" :label="rule.name" @change="handlePickerChange">
      <el-tooltip v-if="!!rule.refer" class="item" effect="dark" :content="useRefer ? referLabel : '重置'" placement="top-end">
        <i class="info-btn el-icon-info" @click="resetRefer()"></i>
      </el-tooltip>
    </ColorPicker>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";
import { debug } from "util";
export default {
  components: {
    ColorPicker
  },
  props: {
    rule: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    const hasRefer = !!this.rule.refer;
    return {
      useRefer: hasRefer
    };
  },
  // data() {
  //   const hasRefer = !!this.rule.refer;
  //   const referLabel = hasRefer ? `同【${this.rule.refer.name}】` : "";
  //   return {
  //     useRefer: hasRefer,
  //     referLabel: referLabel
  //   };
  // },
  computed: {
    hasRefer() {
      return !!this.rule.refer;
    },
    referLabel() {
      return this.useRefer ? `同【${this.rule.refer.name}】` : "";
    }
  },
  methods: {
    handlePickerChange(color) {
      this.$emit("change");
      // 用户修改过就不再是引用了
      if (this.rule.refer) {
        this.useRefer = false;
      }
    },
    resetRefer() {
      this.useRefer = true;
      this.rule.value = this.rule.refer.value;
    }
  },
  watch: {
    rule: {
      handler() {
        if (!this.hasRefer) return;

        if (this.useRefer) {
          this.rule.value = this.rule.refer.value;
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less">
.rule-item {
  width: 200px;
  height: 60px;
  position: relative;
  .info-btn {
    position: absolute;
    right: 4px;
    top: 4px;
    cursor: pointer;
  }
}
</style>
