// Variables
var $anyElement = $('.element');
var $element1 = $('[data-id="element-1"]');
var $element2 = $('[data-id="element-2"]');
var $canvas = $('.canvas');
var $swatch = $('.swatch');
var $noStyle =  $('[data-id="no-style"]');
var $newStyle=   $('[data-id="new-style"]');
var $listItems = $('.dropdown-item');
var currentStyle;
var selectedElement;
var styles = [];

function select(element){
  element.addClass('element--selected');
  selectedElement = element;
}

function instantiateStyle(name, properties){  
  // Add the style to the dropdown
  $('<a class="dropdown-item w-dropdown-link" data-id='+name+' href="#">'+name+'</a>').insertBefore('[data-id="new-style"]');
  
  // Create and return the style objet
  return {
    name: name,
    properties: properties
  }

}
function createStyle(name, propaerties){
  var style = instantiateStyle(name, properties);
  styles.push(style);
}
function setStyle(element, style){
  
  var name = style.name;
  var properties = style.properties;
  element.attr('style', style.properties);
    
  // Remove the selected state from existing list item
  $('.item-selected').removeClass('item-selected');
}
function selectStyle(name){
  
  // Set the selected item name
  $('[data-id="current-class"]').html(name);
  
  // Remove existing active classes
  $('.item-selected').removeClass('item-selected');
  
  // Apply check to selected class
  $('[data-id="'+name+'"]').addClass('item-selected');
}

function closeMenu(){
  $('.dropdown-menu').removeClass('w--open');
  $('.dropdown-toggle').removeClass('w--open');
}

var elementSelected = function(){
  if ($anyElement.hasClass('element--selected'))
    return true
  else
    return false
};

var applyColor = function(element){  
  if(element.hasClass('swatch--1')){
    
    
    selectedElement.css('background-color', '#ea555d');
  } else if(element.hasClass('swatch--2')){
    selectedElement.css('background-color', '#fac35b');
  } else if(element.hasClass('swatch--3')){
    selectedElement.css('background-color', '#56ccb0');
  } else if(element.hasClass('swatch--4')){
    selectedElement.css('background-color', '#24a9ea');
  } else if(element.hasClass('swatch--5')){
    selectedElement.css('background-color', '#7d7dfa');
  } else if(element.hasClass('swatch--6')){
    selectedElement.css('background-color', '#df51f5');
  } else if(element.hasClass('swatch--7')){
    selectedElement.css('background-color', '#ffb56e');
  } else if(element.hasClass('swatch--8')){
    selectedElement.css('background-color', '#8ae645');
  }
};
var clearStyles = function(){
  $swatch.removeClass('swatch--active');
};

// Events
$anyElement.on('click', function(){
  event.stopPropagation();
  $anyElement.removeClass('element--selected');
  $(this).addClass('element--selected');
  selectedElement = $(this);
});

$canvas.on('click', function(){$('')
  if(selectedElement)
    selectedElement.removeClass('element--selected');
    $('[data-id="current-class"]').html("None");
    clearStyles();
});

$swatch.on('click', function(){
  if(elementSelected()){
    $(this).addClass('swatch--active');
    $(this).siblings().removeClass('swatch--active');    
    applyColor($(this));
  }
});


$(document).on('click', '.dropdown-item', function(){
  
  var styleID = $(this).attr('data-id');
  var styleName = $(this).html();
  var style = $.grep(styles, function(e){ return e.name == styleID; });
  
  if (style.length > 0)
    setStyle(selectedElement, style[0]);
    
  selectStyle(styleName);
  closeMenu();

});

$newStyle.on('click', function(){
  $('.form-wrapper').css('display','block');
  closeMenu()
  $('.class-input').val('New class').select().focus();
});

$('.class-input').on('blur', function(){
  //Place new value in the dropdown label
  var name = $(this).val();
  if (name.length > 0)
  
    createStyle(name);
    setStyle(selectedElement, styles[(styles.length)-1]);
    selectStyle(name);
      
  // Hide the input
  $('.form-wrapper').css('display','none');
  
});

$(document).keypress(function(e){
    if (e.which == 13){
      if ($('.class-input').is(":focus"))
        event.preventDefault();
        $('.class-input').blur();
    }
});


select($element1);
createStyle('container','background-color: #ffb56e;');
setStyle(selectedElement, styles[0]);
selectStyle('container');




