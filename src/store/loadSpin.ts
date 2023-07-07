import { defineStore } from 'pinia';
const loadSpin = defineStore({
  // 这里的id必须为唯一ID
  id: 'loadSpin',
  state: () => {
    return {
      spinning: false,
    };
  },
  // 等同于vuex的getter
  getters: {
    getSpinning: state => state.spinning,
  },
  // pinia 放弃了 mutations 只使用 actions
  actions: {
    // actions可以用async做成异步形式
    setSpinning(spinning:boolean) {
      this.spinning = spinning;
    },
  },
});
export default loadSpin;
