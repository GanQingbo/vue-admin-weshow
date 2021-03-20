import request from '@/utils/request'

export default {
  // 订单列表
  getOrderListPage(page, size, searchObj) {
    return request({
      url: '/order/getAllOrder/' + page + '/' + size,
      method: 'post',
      data: searchObj
    })
  },

  // 删除order
  removeOrder(id) {
    return request({
      url: '/order/deleteOrder/' + id,
      method: 'delete',
    })
  },


  // 根据id获取order
  getOrderInfo(id) {
    return request({
      url: '/order/getOrderById/'+id,  //拼接id
      method: 'get'
    })
  },

  // 更新user
  updateOrder(order){
    return request({
      url:'/order/updateOrder/',
      method:'post',
      data: order,
    })
  },

  // 更新删除状态
  updateDeleteStatus(id){
    return request({
      url:'/order/updateDeleteStatus/'+id,
      method:'post',
    })
  },

  // 退票列表
  getReturnListPage(page, size, searchObj) {
    return request({
      url: '/order/getAllOrderReturn/' + page + '/' + size,
      method: 'post',
      data: searchObj
    })
  },

  // 退票处理
  updateOrderReturn(orderReturn){
    return request({
      url: '/order/updateOrderReturn',
      method: 'post',
      data: orderReturn
    })
  }
}
