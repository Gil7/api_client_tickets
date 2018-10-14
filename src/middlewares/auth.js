import  { store }  from '../store/main'
export default (to, from, next) => {
    if (store.getters['user/getUserAuthenticated']){
        console.log("NEXT FRIM AUTH")
        next()
    }
    else {
        next('/signin')
    }

}