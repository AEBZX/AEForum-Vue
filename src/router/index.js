import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import Home from "../components/Home";
import Manage from "../components/Manage";
import Article from "../components/Article";
import Follow from "../components/Follow";
import FollowYou from "../components/FollowYou";
import Image from "../components/Image"
import User from "../components/User";
import Details from "../components/Details";
import Blog from "../components/Blog";
import New from "../components/New";
import List from "../components/List";
import Search from "../components/Search";

Vue.use(Router)
Vue.directive({
  inserted: function(el,binding){
    document.title = el.dataset.title
  }
})
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'manage',
          name: 'Manage',
          component: Manage,
          children: [
            {
              path: 'details',
              name: 'Details',
              component: Details
            }
          ]
        },
        {
          path: 'article',
          name: 'Article',
          component: Article,
          children: [
            {
              path: 'new',
              name: 'New',
              component: New
            },
            {
              path: 'list',
              name: 'List',
              component: List
            }
          ]
        },
        {
          path: 'follow',
          name: 'Follow',
          component: Follow
        },
        {
          path: 'followYou',
          name: 'FollowYou',
          component: FollowYou
        },
        {
          path: 'image',
          name: 'Image',
          component: Image
        },
        {
          path: 'search',
          name: 'Search',
          component: Search
        }
      ]
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      path: '/blog/:id',
      name: 'Blog',
      component: Blog
    }
  ]
})
