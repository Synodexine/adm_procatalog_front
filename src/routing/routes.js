import VueRouter from "vue-router"
import Search from "../components/search/Search"
import Catalog from "../components/catalog/Catalog"
import ProductCreation from "../components/products/ProductCreation"
import ProductUpdate from "../components/products/ProductUpdate"
import ProductView from "../components/products/ProductView"
import Register from "../components/accounts/Register"
import Login from "../components/accounts/Login"
import Account from "../components/accounts/Account"
import Management from "../components/common/Management"

import BrandCreation from "../components/brands/BrandCreation"
import BrandUpdate from "../components/brands/BrandUpdate"

import TagCreation from "../components/tags/TagCreation"
import TagUpdate from "../components/tags/TagUpdate"


const routes = [
    { path: '/', redirect: '/search' },
    { path: '/search', component: Search },
    { path: '/catalog/', component: Catalog, props: (route) => ({searchString: route.query.search}) },
    { path: '/products/add', component: ProductCreation },
    { path: '/products/:uuid/update', component: ProductUpdate },
    { path: '/products/:uuid', component: ProductView },
    { path: '/accounts/register', component: Register },
    { path: '/accounts/login', component: Login },
    { path: '/accounts/info', component: Account },
    { path: '/management', component: Management },

    { path: '/brands/add', component: BrandCreation },
    { path: '/brands/:id/update', component: BrandUpdate },

    { path: '/tags/add', component: TagCreation },
    { path: '/tags/:id/update', component: TagUpdate },
  ]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;