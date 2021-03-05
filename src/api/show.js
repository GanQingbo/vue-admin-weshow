import request from '@/utils/request'


// es6写法
export default {
  // show列表
  getShowListPage(page, size, searchObj) {
    return request({
      url: '/show/show/getShowByPage/' + page + '/' + size, //拼接，两种写法
      //url: '/show/show/getShowByPage/${page}/${size}',
      method: 'post',
      data: searchObj
    })
  },

  // 删除show
  removeShow(id) {
    return request({
      url: '/show/show/deleteShowById/' + id,
      method: 'delete',
    })
  },

  // 获取演出类型
  getShowType() {
    return request({
      url: '/show/showtype/getAllShowType',
      method: 'get',
    })
  },

  // 添加show
  addShow(show) {
    return request({
      url: '/show/show/createShow',
      method: 'post',
      data: show
    })
  },

  // 根据id获取show信息
  getShowInfo(id) {
    return request({
      url: '/show/show/getShowById/'+id,  //拼接id
      method: 'get'
    })
  },

  // 更新show
  updateShow(show){
    return request({
      url:'/show/show/updateShow/',
      method:'post',
      data: show,
    })
  }
}
