import request from '@/utils/request'

export default {
  //获取推荐
  getAllRecommend(){
    return request({
      url: '/show/recommend/getAllRecommend',
      method: 'get',
    })
  },
  // 获取推荐的演出
  getShowRecommend() {
    return request({
      url: '/show/recommend/getShowRecommend',
      method: 'get',
    })
  },

  // 添加推荐
  addRecommend(id) {
    return request({
      url: '/show/recommend/createShowRecommend/'+id,
      method: 'post',
    })
  },

  // 删除
  removeRecommend(id) {
    return request({
      url: '/show/recommend/deleteShowRecommend/' + id,
      method: 'delete',
    })
  },
}
