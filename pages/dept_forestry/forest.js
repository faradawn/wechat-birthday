Page({
  data: {
    msg: 'hello',
    birthInput: '',
    birthList: [],

  },
  birthdayInput(e){
    this.setData({birthInput: e.detail.value})
  },
  search(e){
    if(e.currentTarget.dataset.name === 'birth'){
      var x = this.data.birthInput.toString();
      if(x.length === 1){
        x = '0'.concat(x);
      }
      var data = require('../../assets/sheets/forest_sheet.js').forestSheet;
      var filter1 = data.filter(ele => ele.出生日期.substring(5,7) === x);
 
      
      this.setData({
        birthList: filter1
      })

      console.log(this.data.birthList)
    }
  }
})