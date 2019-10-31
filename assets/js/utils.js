import config from "~/assets/js/common";

var utils = {
	userSex:['男','女','保密'],
	isPhone : function (args) {
		return /^1[3|4|5|7|8][0-9]\d{8}$/.test(args);
	},
	isEmail:function (args) {
		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(args);
	},
	dateFormat:function ({dateTime,dateDivider,time,timeDivider}) {
		dateDivider = dateDivider || "-";
		timeDivider = timeDivider || ":";
		if (typeof dateTime === "string" && !isNaN(dateTime-0)) {
			dateTime = dateTime - 0;
		}
		var date = new Date(dateTime);
		var yy = date.getFullYear();
		var mm = date.getMonth()+1;
		var dd = date.getDay();
		var hh = date.getHours();
		var MM = date.getMinutes();
		var ss = date.getSeconds();
		if (!time) {
			return  yy + dateDivider + mm + dateDivider + dd + " " + hh + timeDivider + MM + timeDivider + ss;
		}
		return  yy + dateDivider + mm + dateDivider + dd;
	},
	isInteger:function (args) {
		var data = args - 0;
		if (typeof data != 'number' || isNaN(data) || data < 0 || data == Infinity || !(data.toString().indexOf('.') < 0) || args === "") {
			return false;
		}
		return true;
    },
    getEditorConfig(config) {
        return Object.assign({
            language: 'zh-cn',
            toolbar: ["heading", "bold", "italic", "strikethrough", "blockQuote", "link", "highlight", "fontSize", "underline", "alignment", "numberedList", "bulletedList", "insertTable", "imageUpload", "undo", "redo"],
            extraPlugins: [],
            fontSize: {
                options: [12, 'default', 14, 16, 18, 20, 22, 24, 26, 28],
            },
        }, config);
    },
    replaceHost(html){
        if(!html){return ""}
        return html.replace(new RegExp("\\"+config.hostTag,"g"),config.res);
    },
    replaceRes(html){
        if(!html){return ""}
        return html.replace(new RegExp(config.res,"g"),config.hostTag);
    },
    isPCEnv(userAgent){
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent)) {
            return false;
        } else {
            return true;
        }
    }
}

export default utils
