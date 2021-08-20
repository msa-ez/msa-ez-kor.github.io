// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.meta.push({
    name: 'google-site-verification',
    content: "oB0o3U6khwkYrh-W15uMb7kob6NYYAqjEVeXdPsVjyE"
  })

  head.meta.push({
    name: "robots",
    content: "Remote Event Storming,EventStorming,Microservices,이벤트스토밍,마이크로서비스,MSA,CNA,클라우드 네이티브,Code generator,intromsaez"
  })

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: process.env.GRIDSOME_BASE_PATH + to.path,
    })
    next()
  })
}
