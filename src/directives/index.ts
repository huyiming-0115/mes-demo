import throttle from "./throttle";
const directives: any = {
    throttle
};
export default {
    install(Vue: any) {
        Object.keys(directives).forEach((key: any) => {
            Vue.directive(key, directives[key]);
        });
    },
};
