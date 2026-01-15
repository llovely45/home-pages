import { h, watch } from 'vue'
import { useData, EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { createMediumZoomProvider } from './composables/useMediumZoom'

import MLayout from './components/MLayout.vue'
import MNavLinks from './components/MNavLinks.vue'

import './styles/index.scss'

/* 引入 fontawesome 核心 */
import { library } from '@fortawesome/fontawesome-svg-core'
/* 引入图标组件 */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* 引入你需要的具体图标 (手动添加需要的图标) */
import {
  faUser,
  faHouse,
  faMagnifyingGlass,
  faEnvelope,
  faRocket,
  faShieldHalved,
  faMagnifyingGlassLocation,
  faChartSimple,
  faRss,
  faArrowRotateRight,
  faSliders,
  faServer,
  faDownload,
  faShuttleSpace,
  faCloud,
  faCat,
  faCodeBranch,
  faCode,
  faRobot,
  faCommentDots,
  faBrain,
  faWind,
  faGlobe,
  faStar,
  faBuilding,
  faCloudSun,
  faRecycle,
  faMicrochip,
  faBolt,
  faNetworkWired,
  faGamepad,
  faBookOpen,
  faFilm,
  faBook,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

/* 将图标添加到库中 */
library.add(
  faUser,
  faHouse,
  faMagnifyingGlass,
  faGithub,
  faEnvelope,
  faRocket,
  faShieldHalved,
  faMagnifyingGlassLocation,
  faChartSimple,
  faRss,
  faArrowRotateRight,
  faSliders,
  faServer,
  faDownload,
  faShuttleSpace,
  faCloud,
  faCat,
  faCodeBranch,
  faCode,
  faRobot,
  faCommentDots,
  faBrain,
  faWind,
  faGlobe,
  faStar,
  faBuilding,
  faCloudSun,
  faRecycle,
  faMicrochip,
  faBolt,
  faNetworkWired,
  faGamepad,
  faBookOpen,
  faFilm,
  faBook,
  faMapMarkerAlt
)

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(MLayout, props)
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    createMediumZoomProvider(app, router)

    app.provide('DEV', process.env.NODE_ENV === 'development')

    app.component('MNavLinks', MNavLinks)

    // 全局注册 FontAwesomeIcon
    app.component('FontAwesomeIcon', FontAwesomeIcon)

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () =>
          updateHomePageStyle(
            /* /vitepress-nav-template/ 是为了兼容 GitHub Pages */
            location.pathname === '/' || location.pathname === '/vitepress-nav-template/',
          ),
        { immediate: true },
      )
    }
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome')) {
    document.documentElement.classList.add('browser-chrome')
  } else if (browser.includes('firefox')) {
    document.documentElement.classList.add('browser-firefox')
  } else if (browser.includes('safari')) {
    document.documentElement.classList.add('browser-safari')
  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

