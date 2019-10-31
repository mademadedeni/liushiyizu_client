import common from "~/assets/js/common";
import api from "axios";

class UploadAdapter {
    constructor(loader, url) {
        this.loader = loader;
        this.url = url;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('uploadFile', file, file.name);
                if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
                    reject("只支持png、jpg类型图片！");
                } else if (file.size > 1024 * 500) {
                    reject("图片大小不超过500KB");
                }
                var url = common.api + (typeof this.url == "string" ? this.url : this.url.url);
                api.post(url, formData, { withCredentials: true }).then(({ data: rsp }) => {
                    if (rsp.success) {
                        resolve({
                            default: common.res + rsp.url
                        });
                    } else {
                        reject(rsp.data);
                    }
                }
                ).catch(function (err) {
                    reject(err);
                })
            }));
    }

    abort() {
    }
}

export default function (url) {
    return function uploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, url);
        };
    }
};
