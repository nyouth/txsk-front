// Import System requirements
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'
import DashView from './components/admin/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'
import IndexView from './components/index/index.vue'

// Import Views - Dash
import DashboardView from './components/admin/dash/Dashboard.vue'
import TablesView from './components/admin/dash/Tables.vue'
import TasksView from './components/admin/dash/Tasks.vue'
import SettingView from './components/admin/dash/Setting.vue'
import AccessView from './components/admin/dash/Access.vue'
import ServerView from './components/admin/dash/Server.vue'
import ReposView from './components/admin/dash/Repos.vue'
import SystemView from './components/admin/dash/system.vue'
import ImageView from './components/admin/dash/Image.vue'

// Import Install and register helper items
Vue.use(Router)
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

// Routing logic
var router = new Router({
  history: true,
  saveScrollPosition: true
})

// Routes
router.map({
  '/login': {
    component: LoginView
  },
  '/': {
    component: IndexView
  },
  '/admin': {
    component: DashView,
    auth: true,
    subRoutes: {
      '': {
        component: DashboardView,
        name: 'Dashboard',
        description: 'Overview of environment'
      },
      '/tables': {
        component: TablesView,
        name: 'Tables',
        description: 'Simple and advance table in CoPilot'
      },
      '/tasks': {
        component: TasksView,
        name: 'Tasks',
        description: 'Tasks page in the form of a timeline'
      },
      '/images': {
        component: ImageView,
        name: '首页Banner',
        description: 'Banner列表'
      },
      '/setting': {
        component: SettingView,
        name: 'Settings',
        description: 'User settings page'
      },
      '/access': {
        component: AccessView,
        name: 'Access',
        description: 'Example of using maps'
      },
      '/server': {
        component: ServerView,
        name: 'Servers',
        description: 'List of our servers'
      },
      '/system': {
        component: SystemView,
        name: 'System',
        description: 'news system'
      },
      '/repos': {
        component: ReposView,
        name: 'Repository',
        description: 'List of popular javascript repos'
      }
    }
  },
  // not found handler
  '*': {
    component: NotFoundView
  }
})

// Redirect for shortcuts
router.redirect({
  '/jobs': '/user/jobs',
  '/me': '/user'
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach(function (transition) {
  // window.console.log('Transition', transition)
  if (transition.to.auth && (transition.to.router.app.$store.state.token === 'null')) {
    window.console.log('Not authenticated')
    transition.redirect('/login')
  } else {
    transition.next()
  }
})

// Resource logic
Vue.use(Resource)

Vue.http.interceptors.push({
  request: function (request) {
    /*
      Enable this when you have a backend that you authenticate against
    var headers = request.headers

    if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {
      headers.Authorization = this.$store.state.token
    }
    */
    // console.log(headers)
    return request
  },
  response: function (response) {
    return response
  }
})

// Start out app!
Vue.config.debug = true
router.start(AppView, '#root')
