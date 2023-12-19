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
            firstTitle: 'Getting Started',
            firstItem: '/started/',
          },
          {
            firstTitle: 'Key features',
            firstItem: '/started/key-features/',
          },
          {
            firstTitle: 'Tutorial',
          },
          {
            firstTitle: 'Concepts',
            name: [
              {
                secondTitle:'Domain Driven Design',
                secondItem:'/started/domain-driven/',
              },
              {
                secondTitle:'Eventstorming',
                secondItem:'/started/event-storming-learning/',
              },
            ]
          },
          {
            firstTitle: 'Setup',
            firstItem: '/tool/setup-on-prem/',
          },
          {
            firstTitle: 'Quick Start',
            name: [
              {
                secondTitle: 'Google Drive example',
                secondItem: '/tool/google-drive-examples/'
              }
            ]
          },
          {
            firstTitle: 'Biz Modeling',
            name:[
              {
                secondTitle:'Eventstorming',
                secondItem:'/tool/event-storming-tool/',
              },
              {
                secondTitle:'Utilizing ChatGPT',
                secondItem:'',
              },
              {
                secondTitle:'Guide labs',
                thirdItems:
                [
                  '/business/',
                  '/business/ddd-google-drive/',
                  '/business/eventstorming-fooddelivery/',
                ]
              },
            ]
          },
          {
            firstTitle: 'Code Implementation',
            name:[
              {
                secondTitle:'Model Driven Development',
                secondItem:'',
              },
              {
                secondTitle:'Marketplace',
                thirdItems:
                [
                  '/tool/marketplace/',
                ]
              },
              {
                secondTitle:'Utilizing ChatGPT',
                secondItem:'',
              },
              {
                secondTitle:'Guide labs',
                thirdItems:
                [
                  '/development/understanding-jpa-based-single-microservice/',
                  '/development/cna-start/',
                  '/development/monolith-2-misvc/',
                  '/development/circuit-breaker/',
                  '/development/kafka-basic/',
                  '/development/pub-sub/',
                  '/development/compensation-correlation/',
                  '/development/pubsub-idempotency/',
                  '/development/pubsub-deadline/',
                  '/development/kafka-scaling/',
                  '/development/kafka-scaling-concurrenty-handling/',
                  '/development/kafka-retry-dlq/',
                  '/development/kafka-connect/',
                  '/development/choreography-saga/',
                  '/development/orchestration-saga/',
                  '/development/gateway/',
                  '/development/token-based-auth/',
                  '/development/oauth2with-keycloak/',
                  '/development/dp-frontend/',
                  '/development/dp-graphql/',
                  '/development/dp-cqrs/',
                  '/development/contract-test/',
                  '/development/conteact-messaging/',
                  '/development/ops-docker/',
                ]
              },
            ]
          },
          {
            firstTitle: 'Custom template',
            name:[
              {
                secondTitle: "What's Custom Template",
                secondItem: '/custom-template/tutorial/'
              },
              {
                secondTitle: 'Custom Template Objects',
                secondItem: '/custom-template/custom-template/'
              },
              {
                secondTitle: 'Creating Custom Template',
                thirdItems:
                [
                  '/custom-template/designing-template-metadata/',
                  '/custom-template/designing-template-template-code/',
                ]
              },
              
            ]
          },
          {
            firstTitle: 'Test Design',
            name:[
              {
                secondTitle: 'Uint Test',
                secondItem: '/custom-template/unit-test/'
              },
              {
                secondTitle: 'API/Service	Test',
                secondItem: '/custom-template/mock-server/'
              }
            ]
          },
          {
            firstTitle: 'Infra(K8s) Modeling',
            name:[
              {
                secondTitle: 'K8s Deployment Design',
                secondItem: '/tool/infrastructure-modeling/'
              },
              {
                secondTitle: 'Guide labs',
                thirdItems:
                [
                ]
              }
            ]
          },
          {
            firstTitle: 'Case Studies',
            name:[
              {
                secondTitle: 'Example Scenario',
                thirdItems:
                [
                  '/example-scenario/accommodation-reservation/',
                  '/example-scenario/food-delivery/',
                  '/example-scenario/library-system/',
                  '/example-scenario/animal-hospital/',
                  '/example-scenario/online-lecture/',
                ]
              },
              {
                secondTitle: 'Customers',
                thirdItems:
                [
                 
                ]
              }
            ]
          },
          {
            firstTitle: 'Support',
            name:[
              {
                secondTitle: 'FAQ',
                thirdItems:
                [
                 
                ]
              },
              {
                secondTitle: 'Q&A',
                thirdItems:
                [
                 
                ]
              },
              {
                secondTitle: 'Contact',
                secondItem: '/contact/question/',
                thirdItems:
                [
                ]
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