// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection, addMetadata }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('settings', require('./gridsome.config').settings);
  });

  api.createPages(async ({ createPage }) => {
    // Index.vue 페이지 리다이렉션 설정
    // createPage({
    //   path: '/',
    //   component: './src/templates/MarkdownPage.vue', // MarkdownPage.vue 경로로 변경
    //   context: {
    //     id: '/started/index/', // 이 부분은 해당 페이지의 고유한 ID로 변경해야 합니다.
    //   },
    // });
  });
}
