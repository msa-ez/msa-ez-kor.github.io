<template>
  <div>
    <Layout>
      <div class="flex flex-wrap items-start justify-start">
        <div class="order-2 w-full md:w-1/4 sm:pl-4 md:pl-6 lg:pl-8 sticky" style="top: 4rem">
          <OnThisPage />
        </div>
        <div class="order-1 w-full md:w-3/4">
          <div class="content">
            <!-- 내용을 직접 가져와 렌더링 -->
            <MarkdownPage/>
          </div>
          <div class="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
            <NextPrevLinks />
          </div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Logo from '@/components/Logo';
import { ArrowRightCircleIcon, ZapIcon, CodeIcon, MoonIcon, SearchIcon } from 'vue-feather-icons';
import Footer from '@/components/Footer';
import MarkdownPage from '../templates/MarkdownPage.vue'

export default {
  components: {
    Logo,
    ArrowRightCircleIcon,
    ZapIcon,
    CodeIcon,
    MoonIcon,
    SearchIcon,
    Footer,
    MarkdownPage
  },

}
</script>