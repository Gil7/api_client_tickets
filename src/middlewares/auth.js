import { user } from '../store/user'
export default (to, from, next) => {
    if(user.getters.user){
        next()
    }
    else {
        next('/signin')
    }

}