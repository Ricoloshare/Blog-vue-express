import NetWork from './network'

export const Login = (data)=>NetWork.post('/api/user/login', data);
export const LoginCheck = ()=>NetWork.get('/api/user/check');
//文章
export const Blog = (limit) => NetWork.get('/api/blog/blogs?limit='+limit);
export const HotBlog = () => NetWork.get('/api/blog/hot');
export const addArt = (data) => NetWork.post('/api/blog/addart',data);
export const editArt = (data) => NetWork.post('/api/blog/editart',data);
export const delArt = (id) => NetWork.get('/api/blog/delart?id='+id);
export const getArt = (id) => NetWork.get('/api/blog/art?id='+id);
export const getClassify = (classify) => NetWork.get('/api/blog/classify?classify='+classify);
//生活
export const getLifes = () => NetWork.get('/api/life/lifes');
export const addOneLife = (data) => NetWork.post('/api/life/editlife',data);
//留言板
export const addMessage = (data) => NetWork.post('/api/meg/add',data);
export const replyMessage = (data) => NetWork.post('/api/meg/reply',data);
export const getMessage = (type) => NetWork.get('/api/meg/get?type='+type);
export const delReply = (id) => NetWork.get('/api/meg/delr?id='+id);
export const delMeg = (id) => NetWork.get('/api/meg/delm?id='+id);
