// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'msaez',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/favicon.png'
  },
  siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'https://example.com'),
  settings: {
    web: process.env.URL_WEB || false,
    twitter: process.env.URL_TWITTER || false,
    github: process.env.URL_GITHUB || false,
    nav: {
      links: [
        { path: '/started/', title: 'Docs' }
      ]
    },
    sidebar: [
      {
        name: 'started',
        sections: [
          {
            firstTitle: '소개',
            firstItem: '/started/',
          },
          {
            firstTitle: 'Quick Start',
            firstItem: '/tool/google-drive-examples/',
          },
          {
            firstTitle: '비즈니스 모델링',
            firstItem: '/business/',
          },
          {
            firstTitle: '코드 생성',
            firstItem:'/tool/model-driven/',
          },
          {
            firstTitle: '인프라 모델링',
          },
          {
            firstTitle: '마켓플레이스',
            firstItem: '/tool/marketplace/'
          },
          {
            firstTitle: '커스텀 템플릿',
            name:[
              {
                secondTitle: '커스텀 템플릿 생성',
                thirdItems:
                [
                  '/custom-template/template-structure/',
                  '/custom-template/for-loop/',
                  '/custom-template/conditional-statement/',
                  '/custom-template/helper/',
                ]
              },
              {
                secondTitle: 'Template Editor 사용법',
              },
            ]
          },
          {
            firstTitle: '테스트',
            name:[
              {
                secondTitle: 'Unit 테스트',
                secondItem: '/custom-template/unit-test/'
              },
              {
                secondTitle: 'API 서비스 테스트',
                secondItem: '/custom-template/mock-server/'
              }
            ]
          },

          {
            firstTitle: '예제 시나리오',
            name:[
              {
                secondTitle: '숙소 예약',
                secondItem: '/example-scenario/accommodation-reservation/'
              },
              {
                secondTitle: '음식 배달',
                secondItem: '/example-scenario/food-delivery/'
              },
              {
                secondTitle: '도서관 시스템',
                secondItem: '/example-scenario/library-system/'
              },
              {
                secondTitle: '동물병원 진료 시스템',
                secondItem: '/example-scenario/animal-hospital/'
              },
              {
                secondTitle: '인터넷 강의수강 시스템',
                secondItem: '/example-scenario/online-lecture/'
              },
            ]
          },
          // {
          //   firstTitle: 'Guide labs',
          //   name:[
          //     {
          //       secondTitle: 'Dev',
          //       thirdItems:
          //       [
          //         // '/development/understanding-jpa-based-single-microservice/',
          //         '/development/cna-start/',
          //         '/development/gateway/',
          //         '/development/monolith-2-misvc/',
          //         // '/development/circuit-breaker/',
          //         // '/development/kafka-basic/',
          //         '/development/pub-sub/',
          //         // '/development/compensation-correlation/',
          //         // '/development/pubsub-idempotency/',
          //         // '/development/pubsub-deadline/',
          //         // '/development/kafka-scaling/',
          //         // '/development/kafka-scaling-concurrenty-handling/',
          //         // '/development/kafka-retry-dlq/',
          //         // '/development/kafka-connect/',
          //         '/development/choreography-saga/',
          //         // '/development/orchestration-saga/',
          //         // '/development/token-based-auth/',
          //         '/development/oauth2with-keycloak/',
          //         // '/development/dp-frontend/',
          //         // '/development/dp-graphql/',
          //         '/development/dp-cqrs/',
          //         // '/development/contract-test/',
          //         // '/development/conteact-messaging/',
          //         // '/development/ops-docker/',
          //       ]
          //     },
          //     {
          //       secondTitle: 'Ops',
          //       thirdItems:
          //       [
          //         '/operation/ops-deploy-diagramming-basic-objects/',
          //         '/operation/ops-deploy-diagramming-advanced-ingress/',
          //         '/operation/ops-deploy-diagramming-advanced-hpa/',
          //         '/operation/ops-deploy-diagramming-advanced-pvc/',
          //         '/operation/ops-deploy-diagramming-advanced-istio/',
          //       ]
          //     },
          //   ]
          // },
          {
            firstTitle: 'Support',
            name:[
              // {
              //   secondTitle: 'FAQ',
              //   thirdItems:
              //   [
                 
              //   ]
              // },
              {
                secondTitle: 'Q&A',
                secondLink:'https://github.com/msa-ez/platform/issues',
              },
              {
                secondTitle: 'Contact',
                secondItem: '/contact/question/',
              }
              
            ]
          },
        ]
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: '**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [
            /token$/
          ]
        }
      }
    },

    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-153107610-3'
      }
    },

    {
      use: '@gridsome/plugin-sitemap',
      options: {  
      }
    }

  ]
}