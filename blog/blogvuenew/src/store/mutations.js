import {
    SET_CLASSIFY,
    SET_LOAD
} from './mutations-type'

export default{
    [SET_CLASSIFY](state,list){
        state.classifies = list;
    },
    [SET_LOAD](state,flag){
        state.load = flag;
    }
}