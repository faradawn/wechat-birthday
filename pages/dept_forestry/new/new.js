// pages/dept_forestry/new/new.js
Page({
  data: {
    salaryArray: [],
    salaryIndex: [40,45],
    ageList: [],
    ageLen: null
  },
  bindMultiPickerChange(e) {
    this.setData({
      salaryIndex: e.detail.value
    })
    this.searchAge();

  },
  //滑动列时触发该事件
  bindMultiPickerColumnChange(e) {
      let currentColunm = e.detail.column; 
      let currentClounmIndex = e.detail.value; 
      let salaryArray = this.data.salaryArray;
      console.log('修改的列为', currentColunm, '，值为', currentClounmIndex);
      let data = {
        salaryArray: this.data.salaryArray, 
        salaryIndex: this.data.salaryIndex 
      }
      data.salaryIndex[currentColunm] = currentClounmIndex
      this.setData(data)
  },
  // search 
  searchAge(){
    var data = require('../../../assets/sheets/forest_sheet.js').forestSheet;
    var small = parseInt(this.data.salaryIndex[0]);
    var large = parseInt(this.data.salaryIndex[1]);
    var day = new Date();
    var curYear = day.getFullYear();

    var filter1 = data.filter(ele => 
      (curYear - parseInt(ele.出生日期.substring(0,4)) >= small) && 
      (curYear - parseInt(ele.出生日期.substring(0,4)) <= large)
    );
    var filter2 = filter1.map(ele => ({
      name: ele.姓名.length === 2 ? 
      (ele.姓名.substring(0,1).concat('\xa0\xa0\xa0').concat(ele.姓名.substring(1,2))) : 
      (ele.姓名),
      date: ele.出生日期
    }));
    var filter3 = filter2.sort((a,b) => 
      (parseInt(a.date.substring(0,4)) - parseInt(b.date.substring(0,4)))
    )

    this.setData({
      ageList: filter3,
      ageLen: filter3.length
    })
  },

  clear(e){
    switch(e.currentTarget.dataset.name){
      case 'picker':
        this.setData({
         ageList: [],
         ageLen: null
        })
        return;
      default:
        return;
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const _this = this;
    let salaryStart = [],
      salaryEnd = [],
      salaryArray = [];
    for (let i = 0; i < 200; i++) {
      salaryStart.push(`${i}岁`);
      salaryEnd.push(`${i}岁`)
    }
    salaryArray.push(salaryStart);
    salaryArray.push(salaryEnd);
    _this.setData({
      salaryArray: salaryArray
    })
  }
})
  
