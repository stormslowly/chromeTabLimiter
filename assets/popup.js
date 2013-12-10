"use strict";


$( function(){
  console.log("page loaded");

  if ( localStorage.tabNum !== undefined ){
    $("#tabNum")[0].value = localStorage.tabNum;
  }

  $("#saveButton").click(function(){
    var elementInput = $("#tabNum")[0];
    var tabNum =  parseInt(elementInput.value);
    if( !isNaN(tabNum) ) {
      localStorage.tabNum = tabNum;
    }else{
      elementInput.value = ""; 
    }
  });

} );