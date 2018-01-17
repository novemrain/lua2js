//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'lua -> js',
    inputValue: null,//'local arr = {"helloworld"}',
    result: '转换结果...',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onAuthor: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickTest: function() {
    wx.showToast({ title: this.data.inputValue})
  },
  onInput : function(e){
      //console.log(e.detail.value)
      //wx.showToast({ title: e.detail.value })
      var rtn = this.translate(e.detail.value)
      this.setData({result : rtn})
      wx.setClipboardData({data: rtn})
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  translate : function (text) {
    // local -> var
    text = text.replace(/\blocal\b/g, 'var')
    // nil -> null
    text = text.replace(/\bnil\b/g, 'null')
    // if -> if(
    text = text.replace(/\bif\b/g, 'if(')
    // then -> )}
    text = text.replace(/\bthen\b/g, ')}')
    // end -> }
    text = text.replace(/\bend\b/g, '}')
    // else -> }else{
    text = text.replace(/\belse\b/g, '}else{')
    // elseif -> }else if(
    text = text.replace(/\belseif\b/g, '}else if(')
    // or -> ||
    text = text.replace(/\bor\b/g, '||')
    // and -> &&
    text = text.replace(/\band\b/g, '&&')
    // elseif -> }else if(
    text = text.replace(/\belseif\b/g, '}else if(')
    // for -> for(
    text = text.replace(/\bfor\b/g, 'for(')
    // do -> ){
    text = text.replace(/\bdo\b/g, '){')
    // tostring -> String
    text = text.replace(/\btostring\b/g, 'String')
    // tonumber -> Number
    text = text.replace(/\btonumber\b/g, 'Number')
    // self -> this
    text = text.replace(/\bself\b/g, 'this')
    // not -> !
    text = text.replace(/\bnot\b/g, '!')
    // math -> Math
    text = text.replace(/\bmath\b/g, 'Math')
    // .. -> +
    text = text.replace(/\.\./g, '+')
    // --[[ -> /*
    text = text.replace(/--\[\[/g, '/*')
    // -- -> //
    text = text.replace(/--/g, '//')
    // ~= -> !=
    text = text.replace(/~=/g, '!=')
    // : -> .
    text = text.replace(/:/g, '.')

    // unname function
    text = text.replace(/function(\s*\w*\(.*?\))/g, 'function$1{')
    // class function
    if(this.data.className){
      var reg = new RegExp('function ' + this.data.className + '\\.([^(]*)\\(([^)]*)\\)', 'g')
      text = text.replace(reg, this.data.className + '.prototype.$1 = function($2){')
    }
    // cocos
    text = text.replace(/\bsetVisible\b/g, 'active = ')
    text = text.replace(/isVisible\(\)/g, 'active')
    text = text.replace(/\bsetString\b/g, 'getComponent(cc.Label).string = ')
    text = text.replace(/getString\(\)/g, 'getComponent(cc.Label).string')
    return text
  }
})
