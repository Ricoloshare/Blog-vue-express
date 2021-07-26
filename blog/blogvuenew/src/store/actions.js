import {
    SET_CLASSIFY,
	SET_LOAD
} from './mutations-type'

export default{
	setClassify({ commit },list){
		commit(	SET_CLASSIFY,list) 
	},
	setLoad({ commit },flag){
		commit(	SET_LOAD,flag) 
	},
}
