import VueRouter from "vue-router"
import Search from "../components/search/Search"
import Catalog from "../components/catalog/Catalog"
import ProductCreation from "../components/products/ProductCreation"
import ProductUpdate from "../components/products/ProductUpdate"


const routes = [
    { path: '/', redirect: '/search' },
    { path: '/search', component: Search },
    { path: '/catalog/', component: Catalog, props: (route) => ({searchString: route.query.search}) },
    { path: '/products/add', component: ProductCreation },
    { path: '/products/:uuid/update', component: ProductUpdate },
  ]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;