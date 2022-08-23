import { createI18n } from 'vue-i18n'
import { zhCN } from './zh-CN'
import { enUS } from './en-US'


const i18n = createI18n({
    legacy: false,
    locale: 'cn',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
        en: enUS,
        cn: zhCN
    }
})

export default i18n