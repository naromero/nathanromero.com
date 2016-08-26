$(document).ready(function(){
  
var newCell   = "<div class='cell'><div class='cell-controls'><button class='new-child'><button class='toggle-direction'></button></button></div><button class='new-sibling'></button></div>";
var cellPadding = "14px"
  
// Toggle selected cell state

var deselectAllCells = function(){
  $(".cell").removeClass("is-selected");
};

var isCellSelected = function(){
  var selectedCount = $(".is-selected").length;
  
  if (selectedCount >= 1){
    return true;
  } else {
    return false;
  }
};


$(document).on( "click", ".cell", function(event) {
  event.stopPropagation();
  
  $(".cell").removeClass("is-selected");
  $(this).addClass("is-selected");
  
  if (isCellSelected() == true){
    $(".cell").css("padding", cellPadding);
  }
  
  if ( $(this).has(".cell").length > 0 ){
    $(this).find(".toggle-direction").css("display", "inline-block");
  } else {
    $(this).find(".toggle-direction").css("display", "none");
  }
  
  
});

$("body").on("click", function(event){
  deselectAllCells();
  
  if (isCellSelected() == false){
    $(".cell").css("padding", "0px");
  }
});

// Create New child cell

$(document).on("click", ".new-child", function(){
  $(this).closest(".cell").append(newCell);
    
});

// Create New sibling cell

$(document).on("click", ".new-sibling", function(){
  event.stopPropagation();
  $(this).closest(".cell").after(newCell);
});

// Toggle cell direction

$(document).on("click", ".toggle-direction", function(){
  $(this).closest(".cell").toggleClass("stack-horizontally");
  
  if ($(this).closest(".cell").hasClass("stack-horizontally")){
    $(this).toggleClass("toggled");
  } else {
    $(this).toggleClass("toggled");
  }

  $
});

// Remove cell on 'delete'

$('html').keyup(function(e){
    var cellCount = $(".cell").length;
    if(e.keyCode == 8 && cellCount > 1) {
        $(".is-selected").remove();
    }
    if(e.keyCode == 27) {
        $(".is-selected").removeClass("is-selected");
    }
});   
   
$(document).on("click", function(){
  
  var selectedCells = $(".is-selected").length;
});
   
   
   
   
   
   
   
   
   
   
});
