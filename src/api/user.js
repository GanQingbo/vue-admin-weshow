import request from '@/utils/request'

export default {
  // user列表
  getUserListPage(page, size, searchObj) {
    return request({
      url: '/user/getAllUser/' + page + '/' + size,
      method: 'post',
      data: searchObj
    })
  },

  // 删除user
  removeUser(id) {
    return request({
      url: '/user/deleteUserById/' + id,
      method: 'delete',
    })
  },

  // 添加user
  addUser(user) {
    return request({
      url: '/user/createUser',
      method: 'post',
      data: user
    })
  },

  // 根据id获取user
  getUserInfo(id) {
    return request({
      url: '/user/getUserById/'+id,  //拼接id
      method: 'get'
    })
  },

  // 更新user
  updateUser(user){
    return request({
      url:'/user/updateUser/',
      method:'post',
      data: user,
    })
  },

  // 更新账号状态
  updateStatus(id){
    return request({
      url:'/user/updateStatus/'+id,
      method:'post',
    })
  }
}
