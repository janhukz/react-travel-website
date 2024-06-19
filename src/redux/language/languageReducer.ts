import i18n from 'i18next'
import {
  CHANGE_LANGUAGE,
  ADD_LANGUAGE,
  LanguageActionTypes
} from './languageActions'


export interface LanguageState {
  language: 'en' | 'zh'
  // { name: string; code: string }[]：表示一个对象数组，每个数组元素的类型都是 { name: string; code: string }。
  languageList: { name: string; code: string }[]
}

// 定义初始的State数据
const defaultState: LanguageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' }
  ]
}

// reducer 根据action完成event handler
export default (state = defaultState, action: LanguageActionTypes) => {
  // 推荐使用switch写法
  // console.log(action)
  if (action.type === CHANGE_LANGUAGE) {
    i18n.changeLanguage(action.payload)
    const newState = { ...state, language: action.payload }
    return newState
  }
  if (action.type === ADD_LANGUAGE) {
    const newState = {
      ...state,
      languageList: [...state.languageList, action.payload]
    }
    return newState
  }
  return state
}
