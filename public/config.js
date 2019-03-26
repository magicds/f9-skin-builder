window.__F9_SKIN_BUILDER__ = {
    // 系统预设
    preset: {
        'default': {
            'name': '露草蓝',
            rule: {
                baseRules: [{
                        name: "主色调",
                        key: "@primary-color",
                        value: "#51a6ef"
                    },
                    {
                        name: "辅助色1",
                        key: "@lesser-color1",
                        value: "#f96d41"
                    },
                    {
                        name: "辅助色2",
                        key: "@lesser-color2",
                        value: "#18a6b6"
                    }
                ],
                advancedRules: [{
                        name: "文本色",
                        key: "@text-color",
                        value: "#3d4b64"
                    },
                    {
                        name: "文本框边框色",
                        key: "@input-border-color",
                        value: "#bdbec1"
                    },
                    {
                        name: "文本框边框色聚焦",
                        key: "@input-focus-border-color",
                        value: "@primary-color"
                    },
                    {
                        name: "列表项目选中背景色",
                        key: "@item-selected-bg",
                        value: "#dfedfa"
                    },
                    {
                        name: "列表项目悬浮背景色",
                        key: "@item-hover-bg",
                        value: "#fffed5"
                    },
                    {
                        name: "表格偶数行背景色",
                        key: "@row-alt-bg",
                        value: "#f5f5f5"
                    }
                ]
            }
        },
        'red': {
            'name': '海棠红',
            rule: {
                baseRules: [{
                        name: "主色调",
                        key: "@primary-color",
                        value: "#ef6366"
                    },
                    {
                        name: "辅助色1",
                        key: "@lesser-color1",
                        value: "#f2a65c"
                    },
                    {
                        name: "辅助色2",
                        key: "@lesser-color2",
                        value: "#3fb0d5"
                    }
                ],
                advancedRules: [{
                        name: "文本色",
                        key: "@text-color",
                        value: "#3d4b64"
                    },
                    {
                        name: "文本框边框色",
                        key: "@input-border-color",
                        value: "#bdbec1"
                    },
                    {
                        name: "文本框边框色聚焦",
                        key: "@input-focus-border-color",
                        value: "#6b7381"
                    },
                    {
                        name: "列表项目选中背景色",
                        key: "@item-selected-bg",
                        value: "#fef0f0"
                    },
                    {
                        name: "列表项目悬浮背景色",
                        key: "@item-hover-bg",
                        value: "#fff9df"
                    },
                    {
                        name: "表格偶数行背景色",
                        key: "@row-alt-bg",
                        value: "#f5f5f5"
                    }
                ]
            }
        },
        'green': {
            'name': '松柏绿',
            rule: {
                baseRules: [{
                        name: "主色调",
                        key: "@primary-color",
                        value: "#02b9b5"
                    },
                    {
                        name: "辅助色1",
                        key: "@lesser-color1",
                        value: "#f3a857"
                    },
                    {
                        name: "辅助色2",
                        key: "@lesser-color2",
                        value: "#29c2e7"
                    }
                ],
                advancedRules: [{
                        name: "文本色",
                        key: "@text-color",
                        value: "#3d4b64"
                    },
                    {
                        name: "文本框边框色",
                        key: "@input-border-color",
                        value: "#bdbec1"
                    },
                    {
                        name: "文本框边框色聚焦",
                        key: "@input-focus-border-color",
                        value: "@primary-color"
                    },
                    {
                        name: "列表项目选中背景色",
                        key: "@item-selected-bg",
                        value: "#e1f9fb"
                    },
                    {
                        name: "列表项目悬浮背景色",
                        key: "@item-hover-bg",
                        value: "#e0edff"
                    },
                    {
                        name: "表格偶数行背景色",
                        key: "@row-alt-bg",
                        value: "#f5f5f5"
                    }
                ]
            }
        }
    },
    previewUrl: "http://192.168.118.47/ep93/frame/fui/pages/skinTest/all.html",
    lessUrl:"http://192.168.118.47/ep93/frame/fui/mutableui/src/skin-clear.less",
    version: '0.0.1'
};

// get 请求
function httpGet(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject('There was a problem with the request.');
                }
            }
        };
        xhr.open('GET', url);
        xhr.send();
    });
}