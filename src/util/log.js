// 应用发布时为true,开发阶段为false
let isBuild = false

const Log = (Vue) => {
  Vue.prototype.$log = new Vue({
    methods: {
      e (param) {
        if (!isBuild) {
          console.log('%c %s \n ERROR: ' + param, 'color:red;', new Date().toLocaleString())
        }
      },

      s (param) {
        if (!isBuild) {
          console.log('%c %s \n SUCCESS: ' + param, 'color:green;', new Date().toLocaleString())
        }
      },

      i (param) {
        if (!isBuild) {
          console.log('%c %s \n INFO: ' + param, 'color:blue;', new Date().toLocaleString())
        }
      },

      w (param) {
        if (!isBuild) {
          console.log('%c %s \n WARN: ' + param, 'color:orange;', new Date().toLocaleString())
        }
      }

    }
  })
}

export default Log
