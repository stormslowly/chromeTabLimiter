"use strict";

(function(){

  var tabsLimit = 15;

  bootstrap();

  chrome.tabs.onCreated.addListener(tabCreateListner);

  function bootstrap(){
    tabsLimit = 15;
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
          if(windows[i].tabs.length > 15){
            console.log("too many tabs happen");
            handleTooManyTabs(tab);
            return;
          }
        }

      }
    });
  }
})();





