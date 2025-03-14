// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'msaez',
  icon: {
    favicon: './src/img/favicon.png',
    touchicon: './src/img/favicon.png',
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
            name: [
              {
                secondTitle: '퀵스타트',
                secondItem: '/tool/google-drive-examples/'
              },
              {
                secondTitle: 'MSAEZ 온프렘 설치',
                secondItem: '/tool/on-prem-inst-gitea/'
              }
            ]
          },
          {
            firstTitle: '비즈니스 모델링 및 구현',
            name:[
              {
                secondTitle: '이벤트스토밍',
                secondItem: '/business/'
              },
              {
                secondTitle: '모델 기반 코드 자동 생성',
                secondItem: '/tool/model-driven/'
              },
              {
                secondTitle: '마켓플레이스',
                secondItem: '/tool/marketplace/'
              },
              {
                secondTitle: '테스트 자동화',
                secondItem: '/custom-template/unit-test/'
              },
              {
                secondTitle: '이벤트 모니터링',
                secondItem: '/tool/event-monitoring/'
              },
              {
                secondTitle: '컴포저블 엔터프라이즈',
                secondItem: '/tool/pbc-marketplace/'
              }
            ]
          },
          {
            firstTitle: 'AI 지원 모델링 및 구현',
            name:[
              {
                secondTitle: 'AI 기반 모델 생성',
                secondItem: '/tool/chat-gpt/'
              },
              {
                secondTitle: 'AI 기반 코드 구현',
                secondItem: '/tool/si-gpt/'
              },
              {
                secondTitle: '애그리거트 설계',
                secondItem: '/tool/aggregate-design/'
              },
              {
                secondTitle: 'DDL to 이벤트스토밍',
                secondItem: '/tool/ddl-to-eventstorming/'
              },
              {
                secondTitle: 'BC & 도메인 설계 AI',
                secondItem: '/tool/bc-domain-gen/'
              },
              {
                secondTitle: 'PL/SQL to Java',
                secondItem: '/tool/plsql-2-java/'
              },
              {
                secondTitle: 'MSAEZ에서 DeepSeek 모델 활용',
                secondItem: '/tool/deepseek-ai/'
              }
            ]
          },
          {
            firstTitle: '코드 구현 실습',
            name:[
              {
                secondTitle: '마이크로서비스 실행',
                secondItem: '/development/cna-start/'
              },
              {
                secondTitle: 'API Gateway',
                secondItem: '/development/gateway/'
              },
              {
                secondTitle: 'Req/Res방식 연계',
                secondItem: '/development/monolith-2-misvc/'
              },
              {
                secondTitle: 'Pub/Sub방식 연계',
                secondItem: '/development/pub-sub/'
              },
              {
                secondTitle: 'Orchestration Saga',
                secondItem: '/development/choreography-saga/'
              },
              {
                secondTitle: 'JWT Token 인증',
                secondItem: '/development/oauth2with-keycloak/'
              },
              {
                secondTitle: 'CQRS 데이터프로젝션',
                secondItem: '/development/dp-cqrs/'
              }
            ]
          },
          {
            firstTitle: '배포 모델링 실습',
            name:[
              {
                secondTitle: 'K8s 배포 모델링',
                secondItem: '/tool/k8s-modeling'
              },
              {
                secondTitle: '기본 배포 다이어그래밍',
                secondItem: '/operation/ops-deploy-diagramming-basic-objects/'
              },
              {
                secondTitle: 'Ingress Gateway',
                secondItem: '/operation/ops-deploy-diagramming-advanced-ingress/'
              },
              {
                secondTitle: '서비스 자동확장(HPA)',
                secondItem: '/operation/ops-deploy-diagramming-advanced-hpa/'
              },
              {
                secondTitle: '퍼시스턴스 볼륨(PV)',
                secondItem: '/operation/ops-deploy-diagramming-advanced-pvc/'
              },
              {
                secondTitle: 'Istio - Service Mesh',
                secondItem: '/operation/ops-deploy-diagramming-advanced-istio/'
              }
            ]
          },
          {
            firstTitle: '커스텀 템플릿',
            name:[
              {
                secondTitle: '커스텀 템플릿 생성',
                secondItem: '/custom-template/template-editor-custom-template/'
              },
              {
                secondTitle: '템플릿 파일 구조',
                secondItem: '/custom-template/template-structure/'
              },
              {
                secondTitle: '반복문&조건문',
                secondItem: '/custom-template/loop-conditional-statement/'
              },
              {
                secondTitle: 'Helper',
                secondItem: '/custom-template/helper/'
              },
              {
                secondTitle: 'Global Helper',
                secondItem: '/custom-template/global-helper/'
              }
              // {
              //   secondTitle: 'Template Editor',
              //   secondItem: '/custom-template/template-editor/'
              // }
            ]
          },
          // {
          //   firstTitle: '토핑',
          //   name:[
          //     {
          //       secondTitle: 'Unit-Test',
          //       secondItem: '/toppings/test-unit/'
          //     },
          //     {
          //       secondTitle: 'API Mocking',
          //       secondItem: '/toppings/test-microcks/'
          //     },
          //     {
          //       secondTitle: 'Contract Test - 동기 호출',
          //       secondItem: '/toppings/test-contract/'
          //     },
          //     {
          //       secondTitle: 'Contract Test - 비동기 호출',
          //       secondItem: '/toppings/test-messaging/'
          //     },
          //     {
          //       secondTitle: 'CI - Github Action',
          //       secondItem: '/toppings/cicd-git-action/'
          //     },
          //     {
          //       secondTitle: 'CD - Argo',
          //       secondItem: '/toppings/cicd-argo/'
          //     },
          //     {
          //       secondTitle: 'Kubernetes',
          //       secondItem: '/toppings/k8s-kubernetes/'
          //     },
          //   ]
          // },
          // {
          //   firstTitle: '테스트',
          //   name:[
          //     {
          //       secondTitle: 'Unit 테스트',
          //       secondItem: '/custom-template/unit-test/'
          //     },
          //     {
          //       secondTitle: 'API 서비스 테스트',
          //       secondItem: '/custom-template/mock-server/'
          //     }
          //   ]
          // },

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
              }
            ]
          },
          {
            firstTitle: '사업 정보',
            name:[
              {
                secondTitle: '기업 사례',
                secondItem: '/info/company/'
              },
              {
                secondTitle: '가격 정책',
                secondItem: '/info/pricing/'
              },
              {
                secondTitle: '파트너십',
                secondItem: '/info/partnership/'
              },
              {
                secondTitle: '컨설팅',
                secondItem: '/info/consulting/'
              }
            ]
          },
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

  ],
}