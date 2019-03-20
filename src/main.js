import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var skinLess = `// 此文件由合并 frame/*.less 生成
// =============================
// 框架样式部分
.fui-accordions {}

.fui-acc {
    &-hd {
        color              : @primary-color;
        border-bottom-color: @primary-color;
    }

    &-toggle {
        color: @primary-color;

        &:hover {
            color: @primary-hover-color;
        }
    }
}// 搜索、重置、展开等按钮
.cond-srh-btn-text,
.cond-srh-btn-toggle,
.fui-search-trigger,
.fui-search-reset-btn,
.fui-search-close-btn,
.fui-search-srh-btn {
    background  : @primary-color;
    border-color: @primary-color;

    &:hover {
        background  : @primary-hover-color;
        border-color: @primary-hover-color;
    }
}

// 工具栏帮助
.fui-toolbar-helper,
.notice-close-btn {
    color: @text-color;

    &:hover {
        color: @primary-color;
    }
}

// 高级搜索按钮
.fui-search-trigger.close {
    background: #fff;
    color     : @primary-color;
}

// 高级搜索项状态
.fui-search-item {

    &.active,
    &:hover {
        border-color: @primary-color;
    }
}
.mini-buttonedit.fui-primary-search .mini-buttonedit-icon:before {
    color: @primary-color;
}

.fui-search-item-remove {
    color: @text-color;

    &:hover {
        color: @primary-color;
    }
}
.fui-search-result-btns span:hover {
    color: @primary-color;
}
.fui-block-hd {
    color: @primary-color;
    &:before {
        background: @primary-color;
    }
}
.action-icon {
    color: @text-color;

    &:hover {
        color: @primary-color;
    }
}

::-moz-selection {
    background: @primary-color;
    color: #fff;
}

::selection {
    background: @primary-color;
    color: #fff;
}.fui-left {

    &-hd,
    .fui-left-title {
        border-bottom-color: @primary-color;
        color              : @primary-color;
    }

    &-toggle {
        background: none;
        color     : @primary-color;
        &:hover {
            color: @primary-hover-color;
        }
    }
}body {
    // 左侧手风琴菜单
    .acc-nav-item.opened > .acc-nav-link.top {
        color: @primary-color;
        border-bottom-color: @primary-color;
    }

    .acc-nav-link.active,
    .acc-nav-link.top:hover {
        color: @primary-color;
    }

    .acc-item-hd:hover {
        .acc-title,
        .acc-toggle {
            color: @primary-color;
        }
    }

    // 左侧手风琴树
    .acc-toggle:hover {
        color: @primary-color;
    }

    .acc-item.opened .acc-item-hd {
        color: @primary-color;
        border-bottom-color: @primary-color;
    }

    .acc-item.opened .acc-title {
        color: @primary-color;
    }

    // 顶部tab菜单 
    .fui-tabnav-main .fui-tabnav-item.active > .fui-tabnav-link {
        color: @primary-color;
        border-bottom-color: @primary-color;
    }

    .fui-tabnav-sub .fui-tabnav-item.active > .fui-tabnav-link {
        color: @primary-color;
    }
}

// =============================
// 此文件由合并 miniui/*.less 生成
// miniui 样式部分
.mini-button {
    border-color: @primary-color;
    background: @primary-color;
}

.mini-button.mini-button-plain {
    color: @text-color;
}

body .mini-button-pressed,
body a:hover.mini-button-pressed,
body .mini-button-checked,
body a:hover.mini-button-checked,
body a.mini-button-popup,
body a:hover.mini-button-popup,
body a:hover.mini-button {
    border-color: @primary-hover-color;
    background: @primary-hover-color;
}

// 语义按钮 primary
.mini-button.mini-btn-primary {
    color: #fff;
    border-color: @lesser-color1;
    background: @lesser-color1;
}

body a:hover.mini-button.mini-btn-primary {
    color: #fff;
    border-color: @lesser-hover-color1;
    background: @lesser-hover-color1;
}

// 语义按钮 info
.mini-button.mini-btn-info {
    color: #fff;
    border-color: @lesser-color2;
    background: @lesser-color2;
}

body a:hover.mini-button.mini-btn-info {
    color: #fff;
    border-color: @lesser-hover-color2;
    background: @lesser-hover-color2;
}

// split btn

.mini-splitbutton.mini-button-popup .mini-button-text {
    background: @primary-color;
}

body a:hover.mini-splitbutton {
    border-color: @primary-color;
    background: @primary-color;
}

body a.mini-splitbutton .mini-button-split:hover,
body a.mini-splitbutton .mini-button-text:hover {
    background-color: @primary-hover-color;
}.mini-buttonedit-focus .mini-buttonedit-border,
.mini-buttonedit-popup .mini-buttonedit-border {
    border-color: @input-focus-border-color;
}.mini-calendar {
    &-yearPrev,
    &-monthPrev,
    &-yearNext,
    &-monthNext,
    &-menu-prevYear,
    &-menu-nextYear{
        &:hover {
            color: @primary-color;
        }
    }
    
}

.mini-calendar .mini-calendar-selected {
    border-color: @primary-color;
    background: @primary-color;
}

.mini-calendar .mini-calendar-selected:hover {
    border-color: @primary-hover-color;
    background: @primary-hover-color;
}


.mini-calendar-menu-selected,
a:hover.mini-calendar-menu-selected,
a:hover.mini-calendar-menu-month {
    color: @primary-color;
    border-color: lighten(@primary-color, 20%);
    background: lighten(@primary-color, 40%);
}

.mini-calendar-menu-years .mini-calendar-menu-selected,
.mini-calendar-menu-years a:hover.mini-calendar-menu-selected,
a:hover.mini-calendar-menu-year {
    color: #fff;
    border-color: @primary-color;
    background: @primary-color;
}


.mini-calendar-cancelButton,
.mini-calendar-clearButton,
.mini-calendar-okButton,
.mini-calendar-tadayButton {
    color: @text-color;
}

.mini-calendar-cancelButton,
.mini-calendar-clearButton {
    border-color: @lesser-color2;
}

.mini-calendar-okButton,
.mini-calendar-tadayButton {
    border-color: @primary-color;
}

.mini-calendar-cancelButton:hover,
.mini-calendar-clearButton:hover {
    color: @lesser-hover-color2;
    border-color: @lesser-hover-color2;
}

.mini-calendar-okButton:hover,
.mini-calendar-tadayButton:hover {
    color: @primary-hover-color;
    border-color: @primary-hover-color;
}.mini-checkbox-checked .mini-checkbox-icon,
.mini-checkboxlist-item-selected .mini-list-icon,
.mini-radiobuttonlist-item-selected .mini-list-icon {
    color: @primary-color;
}

.switch.mini-checkbox-checked .mini-checkbox-icon {
    background: @primary-color;
}html,
body {
    color: @text-color;
}@grid-header-background: #e7e7e7;
@grid-header-color: @text-color;
@grid-header-border-color: #fff;


.mini-grid-headerCell,
.mini-grid-topRightCell {
    border-color: @grid-header-border-color;
    background: @grid-header-background;
    color: @grid-header-color;
}
.mini-grid-headerCell-inner {
    color: @grid-header-color;
}

.mini-grid-row {
    // background : #f2f5f9;
}

.mini-grid-row-alt {
    background : @row-alt-bg;
}

html body .mini-grid-row-selected {
    background: @item-selected-bg;
}

body .mini-grid-row-hover {
    background: @item-hover-bg;
}
.mini-listbox-item-hover {
    background: @item-hover-bg;
}

.mini-listbox-item-selected {
    background: @item-selected-bg;
}

.mini-listbox-border {
    border-color: @input-border-color;
}// .mini-menu-border {
//     border-color: @input-border-color;
// }

.mini-menuitem-text,
.mini-menuitem-allow,
.mini-menu .mini-menuitem-icon {
    color: @text-color;
}

.mini-menu .mini-menu-popup,
.mini-menu .mini-menuitem-hover {
    border-color: @item-hover-bg;
    background: @item-hover-bg;
}

.mini-menu .mini-menuitem-selected {
    border-color: @item-selected-bg;

    background: @item-selected-bg;

}
.mini-messagebox-info,
.mini-messagebox-question {
    color: @primary-color;
}

.mini-messagebox-button {
    background-color: @lesser-color2;
}

.mini-messagebox-buttons .mini-messagebox-button:hover {
    background-color: @lesser-hover-color2;
}

.mini-messagebox-button.ok {
    background-color: @lesser-color1;
}

.mini-messagebox-buttons .mini-messagebox-button.ok:hover {
    background-color: @lesser-hover-color1;
}.mini-pager .mini-button,
.mini-pager .mini-button-icon {
    color: @primary-color;
}

.pagination-current,
.pagination-button.pagination-current:hover {
    color: @primary-color;
    border-color: @primary-color;
}
body .mini-pager-num,
.pagination-pagerchange input {
    border-color: @input-border-color;

    &:focus {
        border-color: @input-focus-border-color;
    }
}.mini-panel-border {
    border-color : @primary-color;
}
// .mini-panel-border,
// .mini-window .mini-panel-border {
//     border-color : @primary-color;
// }
.mini-panel-header,
.mini-window .mini-panel-header {
    color : @text-color;
    // background : #fff;
}

.mini-tools > span:hover {
    color: @primary-hover-color;
}
.mini-tab {
    color: @text-color;
}

.mini-tab-active {
    color: @primary-color;
    border-top-color: @primary-color;
}

.mini-tab-hover {
    color: @primary-hover-color;
    border-top-color: @primary-color;
}

.mini-tab-active .mini-tab-icon,
.mini-tab-hover .mini-tab-icon {
    color: @primary-color;
}.mini-textbox-input,
.mini-textboxlist .mini-textboxlist-input {
    color: @text-color;
}

.mini-prompt-input,
.mini-textbox-border,
.mini-textboxlist-border {
    border-color: @input-border-color;
}

.mini-textboxlist-focus .mini-textboxlist-border,
.mini-textbox-focus .mini-textbox-border {
    border-color: @input-focus-border-color;
}

.mini-textbox-input:focus,
.mini-buttonedit-input:focus,
.mini-buttonedit-focus .mini-buttonedit-input,
.mini-textboxlist-focus .mini-textboxlist-border {
    box-shadow: inset 0 0 4px rgba(red(@input-focus-border-color), green(@input-focus-border-color), blue(@input-focus-border-color), .4);
}

.mini-textboxlist .mini-textboxlist-item {
    color: @text-color;
}.mini-tooltip-inner {
    border-color: @primary-color;
}

.mini-tooltip-top .mini-tooltip-arrow {
    border-top-color: @primary-color;
}

.mini-tooltip-left .mini-tooltip-arrow {
    border-left-color: @primary-color;
}

.mini-tooltip-right .mini-tooltip-arrow {
    border-right-color: @primary-color;
}

.mini-tooltip-bottom .mini-tooltip-arrow {
    border-bottom-color: @primary-color;
}

.mini-tooltip-bottomleft .mini-tooltip-arrow {
    border-bottom-color: @primary-color;
}

.mini-tooltip-bottomright .mini-tooltip-arrow {
    border-bottom-color: @primary-color;
}

.mini-tooltip-topleft .mini-tooltip-arrow {
    border-top-color: @primary-color;
}

.mini-tooltip-topright .mini-tooltip-arrow {
    border-top-color: @primary-color;
}.mini-tree .mini-tree-icon {
    color: @primary-color;
}
.mini-tree-checkbox-indeterminate,
.mini-tree-checkbox-checked {
    color: @primary-color;
}

.mini-tree-node-hover {
    background: @item-hover-bg;
}

.mini-tree-selectedNode {
    background: @item-selected-bg;
}// dataexport 
.mini-export-listbtn:hover {
    background-color: lighten(@primary-color, 40%);
}

.mini-export-listbtn:active {
    border-color: lighten(@primary-color, 10%);
    background-color: lighten(@primary-color, 40%);
}

.dataimport-export {
    background: @primary-color;
    border-color: @primary-color;

    &:hover {
        background: @primary-hover-color;
        border-color: @primary-hover-color;
    }
}


// DateRangePicker 
.layui-laydate-header i:hover,
.layui-laydate-header span:hover {
    color: @primary-color;
}

.layui-laydate .layui-this {
    background: @primary-color;

    &:hover {
        background: @primary-hover-color;
    }
}

.layui-laydate-content td.laydate-selected {
    background: lighten(@primary-color, 40%);
}

// largefileuploader

.mini-ntko-pick {
    background: @primary-color;

    &:hover {
        background: @primary-hover-color;
    }
}

// tabstreeselect

.mini-tabstreeselect-tabs>li:hover {
    color: @primary-color;
}

.mini-tabstreeselect-tabs>li.active {
    color: @primary-color;
}

.mini-tabstreeselect-header-main {
    color: @primary-color;
}

.mini-tabstreeselect-action {

    &.up,
    &.down {
        color: @primary-color;

        &:hover {
            color: @primary-hover-color;
        }
    }

    &.removeall,
    &.recover {
        color: @text-color;

        &:hover {
            color: @primary-hover-color;
        }
    }

    &.remove {
        color: @primary-color;

        &:hover {
            color: @lesser-hover-color1;
        }
    }
}

.mini-tabstreeselect-item {
    &:hover {
        background: @item-hover-bg;
    }

    &.selected {
        background: @item-selected-bg;
    }
}

// webuploader
.mini-uploader-btns .webuploader-pick {
    background: @primary-color;
    border-color: @primary-color;

    &:hover {
        background: @primary-hover-color;
        border-color: @primary-hover-color;
    }
}

.mini-filtertree .filter-search-btn {
    
    &:hover {
        color: @primary-color;
    }
}`

new Vue({
  // render: h => h(App),
  render: h => h(App, {
    props: {
      "baseRules": [{
        "name": "主色调",
        "key": "@primary-color",
        "value": "#258ce5"
      }, {
        "name": "辅助色1",
        "key": "@lesser-color1",
        "value": "#f2733d"
      }, {
        "name": "辅助色2",
        "key": "@lesser-color2",
        "value": "#2db3ae"
      }, {
        "name": "文本色",
        "key": "@text-color",
        "value": "#444"
      }],
      "advancedRules": [{
        "name": "文本框边框色",
        "key": "@input-border-color",
        "value": "#bdbec1"
      }, {
        "name": "文本框边框色聚焦",
        "key": "@input-focus-border-color",
        "value": "@primary-color"
      }, {
        "name": "列表项目选中背景色",
        "key": "@item-selected-bg",
        "value": "#dfedfa"
      }, {
        "name": "列表项目悬浮背景色",
        "key": "@item-hover-bg",
        "value": "#fffed5"
      }, {
        "name": "表格偶数行背景色",
        "key": "@row-alt-bg",
        "value": "#f5f5f5"
      }],
      less: `
      // miniui 语义化按钮颜色 rgb 都 + 15
        @primary-hover-color: rgb(red(@primary-color) + 15, green(@primary-color) + 15, blue(@primary-color) + 15);
        @lesser-hover-color1: rgb(red(@lesser-color1) + 15, green(@lesser-color1) + 15, blue(@lesser-color1) + 15);
        @lesser-hover-color2: rgb(red(@lesser-color2) + 15, green(@lesser-color2) + 15, blue(@lesser-color2) + 15);
        ${skinLess}`
    },
    on: {
      change: function (css) {
        // console.log('change', css);
      }
    }
  }),
}).$mount('#app')