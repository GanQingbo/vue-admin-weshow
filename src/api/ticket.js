import request from '@/utils/request'

export default {
  // ticket列表
  getTicketListPage(page, size, searchObj) {
    return request({
      url: '/ticket/getTicketByPage/' + page + '/' + size,
      method: 'post',
      data: searchObj
    })
  },

  // 添加
  addTicket(ticket) {
    return request({
      url: '/ticket/createTicket',
      method: 'post',
      data: ticket
    })
  },
  //更新
  updateTicket(ticket){
    return request({
      url:'/ticket/updateTicket/',
      method:'post',
      data: ticket,
    })
  },
  //删除
  removeTicket(id){
    return request({
      url:'/ticket/deleteTicket/'+id,
      method:'delete',
    })
  },

  getTicketInfo(id){
    return request({
      url:'/ticket/getTicketQueryById/'+id,
      method:'get',
    })
  }
}
