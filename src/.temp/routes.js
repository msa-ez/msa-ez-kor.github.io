const c1 = () => import(/* webpackChunkName: "page--src--templates--markdown-page-vue" */ "/Users/kibum0405/Desktop/msa-ez-kor.github.io/src/templates/MarkdownPage.vue")
const c2 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/kibum0405/Desktop/msa-ez-kor.github.io/node_modules/gridsome/app/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/kibum0405/Desktop/msa-ez-kor.github.io/src/pages/Index.vue")

export default [
  {
    path: "/templates-language/springboot-java-template/",
    component: c1
  },
  {
    path: "/templates-language/python-template/",
    component: c1
  },
  {
    path: "/tool/infrastructure-modeling/",
    component: c1
  },
  {
    path: "/templates-language/go-template/",
    component: c1
  },
  {
    path: "/docs/writing-content/",
    component: c1
  },
  {
    path: "/tool/event-storming-tool/",
    component: c1
  },
  {
    path: "/started/event-storming-learning/",
    component: c1
  },
  {
    path: "/templates-language/custom-template/",
    component: c1
  },
  {
    path: "/tool/cloud-ide-tool/",
    component: c1
  },
  {
    path: "/tool/development-practice/",
    component: c1
  },
  {
    path: "/started/domain-driven/",
    component: c1
  },
  {
    path: "/docs/settings/",
    component: c1
  },
  {
    path: "/docs/sidebar/",
    component: c1
  },
  {
    path: "/example-scenario/online-lecture/",
    component: c1
  },
  {
    path: "/example-scenario/library-system/",
    component: c1
  },
  {
    path: "/docs/installation/",
    component: c1
  },
  {
    path: "/example-scenario/food-delivery/",
    component: c1
  },
  {
    path: "/docs/deploying/",
    component: c1
  },
  {
    path: "/example-scenario/accommodation-reservation/",
    component: c1
  },
  {
    path: "/example-scenario/animal-hospital/",
    component: c1
  },
  {
    path: "/started/",
    component: c1
  },
  {
    path: "/docs/",
    component: c1
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    name: "home",
    path: "/",
    component: c3
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
