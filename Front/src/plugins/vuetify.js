/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { pt } from 'vuetify/locale'

// Composables
import { createVuetify } from 'vuetify'
// import AlignBaselineDark from '@/icons/AlignBaselineDark.vue'
const filesDark = import.meta.glob('@/icons/Dark/*.vue');
const filesLight = import.meta.glob('@/icons/Light/*.vue');
const aliasesCustom = {}
await Promise.all(
  Object.entries(filesDark).map(async ([path, component]) => {
    const componentName = path.replace('/src/icons/Dark/', '').replace('.vue', '');
    const componentModule = await component();
    aliasesCustom[componentName] = componentModule.default || componentModule;
  }),
);
await Promise.all(
 
  Object.entries(filesLight).map(async ([path, component]) => {
    const componentName = path.replace('/src/icons/Light/', '').replace('.vue', '');
    const componentModule = await component();
    aliasesCustom[componentName] = componentModule.default || componentModule;
  })
);



// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    display: {
    mobileBreakpoint: 'sm',
    
    thresholds: {
      xs: 0,
      sm: 550,
      md: 1000,
      lg: 1180,
      xl: 1520,
      xxl: 1960,
    },
  },
  icons: {
    aliases: {
      ...aliasesCustom
  },
  },
  locale: {
    messages: { pt },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        colors: {
          background: '#303030ff',
          surface: '#1e1e1e',
          primary: '#1976D2',
          secondary: '#03DAC6',
        },
      },
      light: {
        colors: {
          background: '#e6e6e6ff',
          surface: '#f5f5f5ff',
          primary: '#1976D2',
          secondary: '#03DAC6',
        },
      },
    },
  },
})
