import { defineConfig } from 'vitepress'
export default defineConfig({
  title: 'EiogDoc',
  description: '@Eiog<https://github.com/Eiog>',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Eiog' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
      {
        text: '笔记',
        items: [
          { text: '接入ChatGPT到自己的项目', link: '/note/接入ChatGPT到自己的项目' },
        ],
      },
    ],
  },
})
