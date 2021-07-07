Page({
  data: {
    birthInput: '',
    birthList: [],
    birthLen: null,

    joinInput: '',
    joinList: [],
    joinLen: null,

    joinInput: '',
    joinList: [],
    joinLen: null,

    pickerArray: ['参加工作时间','入职时间'],
    pickerIndex: 0

  },

  searchBirth(e){
    this.setData({birthInput: e.detail.value})
    var x = this.data.birthInput.toString();
    if(x.length === 1){
      x = '0'.concat(x);
    }
    var data = require('../../assets/sheets/forest_sheet.js').forestSheet;
    var filter1 = data.filter(ele => ele.出生日期.substring(5,7) === x);
    var filter2 = filter1.map(ele => ({
      name: ele.姓名.length === 2 ? 
        (ele.姓名.substring(0,1).concat('\xa0\xa0\xa0').concat(ele.姓名.substring(1,2))) : 
        (ele.姓名),
      birthday: ele.出生日期.substring(5,10)
    }))
    var filter3 = filter2.sort((a,b) => 
      (parseInt(a.birthday.substring(3,5)) - parseInt(b.birthday.substring(3,5)))
    )
    this.setData({
      birthList: filter3,
      birthLen: filter3.length
    })
  },

  clear(e){
    switch(e.currentTarget.dataset.name){
      case 'first':
        this.setData({
          birthInput: '',
          birthLen: null,
          birthList: []
        })
        return;
      case 'second':
        this.setData({
          joinInput: '',
          joinLen: null,
          joinList: []
        })
          return;
      default:
        return;
    }
    
  },

  // second search 
  searchJoin(e){
    this.setData({joinInput: e.detail.value})
    if(this.data.joinInput.length < 3)
      return;
    var prefix = this.data.joinInput.substring(0,2);
    if(prefix !== ('大于' || '小于' || '等于'))
      return;

    var day = new Date();
    var curYear = day.getFullYear();
    var numYear = this.data.joinInput.substring(2,5);
    var data = require('../../assets/sheets/forest_sheet.js').forestSheet;

    if(prefix === '大于'){
      var filter1 = data.filter(ele => curYear - parseInt(ele.参加工作时间.substring(0,4)) >= numYear);
      var filter2 = filter1.map(ele => ({
        name: ele.姓名.length === 2 ? 
        (ele.姓名.substring(0,1).concat('\xa0\xa0\xa0').concat(ele.姓名.substring(1,2))) : 
        (ele.姓名),
        date: ele.参加工作时间
      }));
      var filter3 = filter2.sort((a,b) => 
      (parseInt(a.date.substring(0,4)) - parseInt(b.date.substring(0,4)))
    )
      this.setData({
        joinList: filter3,
        joinLen: filter3.length
      })
    } 
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerIndex: e.detail.value
    })
  },


})