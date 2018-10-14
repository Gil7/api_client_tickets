import  { store }  from '../store/main'
export default (to, from, next) => {
    console.log('FROM loggedin', store.getters['user/getUserAuthenticated'])
    if (store.getters['user/getUserAuthenticated']){
        console.log('from loggedin redirect to tickets')
        next('/tickets')
    }
    else {
        next()
    }
}