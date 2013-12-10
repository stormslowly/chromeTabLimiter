"use strict";

(function(){


  bootstrap();

  chrome.tabs.onCreated.addListener(tabCreateListner);

  function bootstrap(){
    getTabLimit();
  }

  function getTabLimit(){
    console.log(localStorage);
    if (localStorage.tabNum === undefined){
      localStorage.tabNum = 15;
      return 15;
    }else{
      var num = parseInt(localStorage.tabNum);
      if( isNaN(num)){
        localStorage.tabNum = 15;
      }else{
        return num;
      }
    }
  }

  function handleTooManyTabs(currentTab){
    var isContinue;
    console.log("oo many tabs");
    isContinue = confirm("too many tabs\n Continue?");
    console.log("answer",isContinue);
    
    if(!isContinue){
      chrome.tabs.remove(currentTab.id);
    }

  } 

  function tabCreateListner(tab){
    console.log("new Tab created!");
    console.log(tab);
    chrome.windows.getAll({populate:true},function( windows ){
      for(var i in windows){
        if(tab.windowId === windows[i].id ){
          if(windows[i].tabs.length > getTabLimit() ){
            console.log("too many tabs happen");
            handleTooManyTabs(tab);
            return;
          }
        }

      }
    });
  }
})();





