var focusedElement;
var focusedStyle;
var noStyle = {
  name: 'No style',
  id: 'no-style',
  properties: {
    backgroundColor: 'rgb(240,240,240)',
    color: 'rgb(51, 51, 51)',
    borderRadius: '0px'
  }
}
var styles = [noStyle];
var swatches = ['rgb(234, 85, 93)','rgb(250, 195, 91)','rgb(86, 204, 176)','rgb(36, 169, 234)','rgb(125, 125, 250)','rgb(223, 81, 245)','rgb(255, 181, 110)','rgb(138, 230, 69)'];
var textSwatches = ['rgb(255, 255, 255)','rgb(179, 179, 179)','rgb(102, 102, 102)','rgb(26, 26, 26)'];

// Create swatches
function createSwatches(){
  for (i in swatches){
    var swatch = '<div class="swatch swatch-'+i+'" data-id="swatch-'+i+'"></div>';
    $('.swatches').append(swatch);
    $('.swatch-'+i+'')[0].style['backgroundColor'] = swatches[i];
    $('.swatch-'+i+'').on('click', function(){
      applyProperty($(this), 'backgroundColor');
    });
  }
}

function createTextSwatches(){
  for (i in textSwatches){
    var textSwatch = '<div class="textSwatch textSwatch-'+i+'" data-id="textSwatch-'+i+'"></div>';
    $('.textSwatches').append(textSwatch);
    $('.textSwatch-'+i+'')[0].style['backgroundColor'] = textSwatches[i];
    $('.textSwatch-'+i+'').on('click', function(){
      applyProperty($(this), 'color');
    });
  }
}

// Updates focused element and style variables
function updateVars(){
  if ($('.element--selected').length){
    focusedElement = $('.element--selected');
    var result = $.grep(styles, function(e){ return e.id == focusedElement.attr('data-style'); });
    focusedStyle = result[0];
  } else {
    focusedStyle = styles[0];
    focusedElement = '';
  }
}

// Updates the selector menu with current style
function updateSelector(style){
  if (focusedStyle.id !== 'no-style'){
    // Append style name to selector
    $('[data-id="current-class"]').html(style.name);
    // Apply check mark to current style list item
    $('.dropdown-item.item-selected').removeClass('item-selected');
    $('.dropdown-item[data-style='+style.id+']').addClass('item-selected');
    // Update element tag
    $('.element--selected .element-tag-text').text(style.name);
  } else {
    // Append style name to selector
    $('[data-id="current-class"]').html('<span class="style-placeholder">Select a style</span>');
    // Apply check mark to current style list item
    $('.dropdown-item.item-selected').removeClass('item-selected');
    // Update element tag
    $('.element--selected .element-tag-text').text(style.name);
  }
  closeMenu();
}

// Returns style applied to elements
function returnStyle(element){
  var result = $.grep(styles, function(e){ return e.id == $(element).attr('data-style'); });
  appliedStyle = result[0];
  return appliedStyle;
}

// Removes selected state from all elements
function unfocusAll(){
  $('.element--selected').removeClass('element--selected');
  $('.element-tag').css('display', 'none');
}

// Unfocuses all elements and focuses clicked element
function focusElement(element){
  unfocusAll();
  $(element).addClass('element--selected');
  $('.element--selected .element-tag').css('display', 'block');
  updateVars();
  updateSelector(focusedStyle);
}

// Closes selector menu
function closeMenu(){
  $('.dropdown-menu').removeClass('w--open');
  $('.dropdown-toggle').removeClass('w--open');
}

// Apply color to focusedSwatch
function applyProperty(element, property){
  if (focusedElement){
    updateVars();
    switch (property){
      case 'backgroundColor':
        var color = element[0].style[property];
        focusedStyle.properties[property] = color;
        $('.element[data-style='+focusedStyle.id+']').css(property, color);
        updateVars();
        break;
      case 'color':
        var color = element[0].style['backgroundColor'];
        focusedStyle.properties[property] = color;
        $('.element[data-style='+focusedStyle.id+']').css(property, color);
        updateVars();
        break;  
      case 'borderRadius':
        var radius = element.val()+'px';
        focusedStyle.properties[property] = radius;
        $('.element[data-style='+focusedStyle.id+']').css(property, radius);
        updateVars();
        break;
    }
  }
}

// Applies style and properties to element
function applyStyle(element,style){
  element.attr('data-style', style.id);
  for ( i in style.properties ) {
    console.log('running');
    element[0].style[i] = style.properties[i];
  }
  updateVars();
}

// Applies style and properties to element
function removeStyle(element){
  element.attr('data-style', 'no-style');
  updateVars();
}

function refreshMenu(){
  
  if (focusedStyle.id == 'no-style'){
    $('.setting-block.style').css('display', 'none');
    $('[data-id="select-style"]').css('display', 'block');
    $('[data-id="remove-style"]').addClass('is-disabled');
  } else {
    $('.setting-block.style').css('display', 'block');
    $('[data-id="select-style"]').css('display', 'none');
    $('[data-id="remove-style"]').removeClass('is-disabled');
  }
}

$(document).on('click','.custom-style', function(){
  var appliedStyle = returnStyle(this);
  applyStyle(focusedElement, appliedStyle);
  updateSelector(appliedStyle);
});

// Create new style
function createNewStyle(){
  // Create new style
  var name = $('.class-input').val();
  var id = name.replace(/\s+/g, '-').toLowerCase();
  var backgroundColor = 'rgb(240,240,240)';
  var color = 'rgb(51, 51, 51)';
  var borderRadius = '0px';
  var newStyle = {
    name: name,
    id: id,
    properties: {
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      color: color
    }
  }
    
  styles.push(newStyle);
  
  // Append styles to selector menu
  var newListItem = '<a class="dropdown-item custom-style w-dropdown-link" data-style='+newStyle.id+' href="#">'+newStyle.name+'</a>'
  $('.custom-styles').append(newListItem);
}

// Click element
$('.element').on('click', function(){
  focusElement(this);
  updateVars();
});

// Apply border radius
$('#radiusInput').on('input', function(){
  applyProperty($(this), 'borderRadius');
});

// Display new class input
$(document).on('click', '.create-new-style', function(){
  closeMenu();
  $('.form-wrapper').css('display', 'block');
  $('.class-input').val('New style');
  $('.class-input').select();
});

// Create new style
$(document).on('blur', '.class-input', function(){
  createNewStyle();
  var newStyle = styles[styles.length - 1];
  applyStyle(focusedElement, newStyle);
  updateSelector(newStyle);
  $('.form-wrapper').css('display', 'none');
  updateVars();
  refreshMenu();
});
$(document).keypress(function(e){
    if (e.which == 13){
      if ($('.class-input').is(":focus"))
        event.preventDefault();
        $('.class-input').blur();
    }
});

$('[data-id="remove-style"]').on('click', function(){
  applyStyle(focusedElement, styles[0]);
  updateSelector(styles[0]);
  updateVars();
  closeMenu();
});

$(document).on('click','.dropdown', function(){
  updateVars();
  refreshMenu();
});

// Page load shit
createSwatches();
createTextSwatches();
focusElement($('[data-id="element-1"]'));
updateVars();
refreshMenu();
