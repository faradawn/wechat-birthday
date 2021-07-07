// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    password: null,
    isClosed: true
  },

  handlePassword(e){
    const PASSWORD = '9999';
    this.setData({password: e.detail.value});
    if(this.data.password === PASSWORD){
      this.setData({isClosed: false})
    }else{
      this.setData({isClosed: true})
    }
  },
 
  goForest() {
    wx.navigateTo({
      url: '../dept_forestry/forest/forest'
    })
  },
  goAge() {
    wx.navigateTo({
      url: '../dept_forestry/new/new'
    })
  },

})
