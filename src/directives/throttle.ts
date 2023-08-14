// 防止按钮连续点击
export default {
    mounted(el?: any, binding?: any) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 500)
            }
        })
    },
}