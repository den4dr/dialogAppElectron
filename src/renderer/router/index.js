import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/login',
      name: 'login-page',
      component: require('@/components/LoginPage').default
    },
    {
      path: '/conversation-mode',
      name: 'conversation-mode',
      component: require('@/components/ConversationMode').default
    },
    {
      path: '/intent-check-mode',
      name: 'intent-check-mode',
      component: { template: '<div>intent check now on going</div>' }
    },
    {
      path: '/dialog-test-mode',
      name: 'dialog-test-mode',
      component: { template: '<div>dialog test now on going</div>' }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
