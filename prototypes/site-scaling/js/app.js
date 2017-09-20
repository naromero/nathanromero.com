/* ====================== Global Variables ====================== */

// Captures mousedown on handles, allows for drag if true
var canvasMouseDown = false;
var mqMouseDown = false;

// Stored MQ shit
var mediaQueryList = [];
var mqCount = 0;
var activeMQ;
var clickedMQ;

// Stored variables for resizing calculations
var canvasWidth = $('.canvas').width();
var sidebarWidth = 35;
var padding = 80;
var minWidth;
var maxWidth;
var mqRanges = [];
var minArtboardWidth = 100 + padding;

var scaleFactor = parseInt(1);
var scaleMultiplier = parseInt(1);




/* ====================== MQ Functions ====================== */

function returnScale(value){
  return Math.floor(value*scaleFactor);
}

function returnMultiplier(value){
  return Math.floor(value*scaleMultiplier);
}

function scaleSite(scale){

  scaleFactor = scale;
  scaleMultiplier = 1/scale;

  refreshMQ();
  toggleMQ($('[data-id='+$(activeMQ).attr('data-id')+']'), true);

  // Resize artboard
  $('.artboard').css('width', $('.mq--active').width());

  // Remove add control
  $('.add-wrapper').removeClass('active');

}

function createMQ(name, size){

  var mq = {
    name: name,
    size: size,
    id: mqCount
  }

  // Push new media query to list
  mediaQueryList.push(mq);

  // Sort mq by size
  function sortByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = 1;
        } else if (a[property] > b[property]) {
            sortStatus = -1;
        }

        return sortStatus;
    };
  }
  mediaQueryList = mediaQueryList.sort(sortByProperty('size'));

  // Refresh MQ bar with updated media query list
  refreshMQ();

  // Update media query count
  mqCount++;
}

function returnMQ(node){
  var mqID = $(node).attr('data-id');
  var result = $.grep(mediaQueryList, function(e){ return e.id == mqID;});
  return result[0];
}
function refreshMQ(){

  // Empty MQ holder
  $('.mq-holder').empty();

  // Loop through mq list and append correct markup
  for (i in mediaQueryList){
    var html;
    var id = mediaQueryList[i].id;
    var name = mediaQueryList[i].name;
    var size = mediaQueryList[i].size;

    // Create HTML
    if (name == 'Fullscreen'){
      html = "<div class='mq' style='width: "+canvasWidth+"px;' data-id='"+id+"' data-name='"+name+"'><div class='fullscreen-label'></div><div class='fullscreen-label right'></div></div>";
    } else {
      html = "<div class='mq' style='width: "+returnScale(size)+"px;' data-id='"+id+"' data-name='"+name+"'><div class='mq-resizer'></div><div class='mq-menu'><div class='menu-icon'></div><div class='mq-dropdown'><div class='dropdown-section'><div class='dropdown-item disabled' data-action='edit'>Edit breakpoint</div><div class='dropdown-item disabled' data-action='rename'>Rename breakpoint</div><div class='dropdown-item disabled' data-action='clear-styles'>Clear styles</div></div><div class='dropdown-section'><div class='dropdown-item' data-action='delete'>Delete Breakpoint</div></div></div></div><div class='label'>"+size+"</div></div>";
    }

    // Append HTML
    $('.mq-holder').append(html);

  }
}
function resizeMQ(element, size){

  // Find and update MQL size
  var mqIndex = mediaQueryList.findIndex(function(mq){
    return mq.id == $(clickedMQ).attr('data-id');
  });

  if (mqIndex !==0){
    mediaQueryList[mqIndex].size = size;
  }

  // Update canvas and mq size views
  $(element).css('width', size);
  $(".artboard").css("width", size);
  $(element).find('.label').text(returnMultiplier(size));

}
function toggleMQ(element, makeActive){
  // Toggle active media quert
  $('.mq').removeClass('mq--active');
  $(element).addClass('mq--active');

  // Set label
  var labelText = $(element).attr('data-name');
  $('.mq-label').html(labelText);

  // Show/hide label on hover
  $('.label').removeClass('active');
  $('.mq-menu').removeClass('active');

  $(element).find('.label').addClass('active');
  $(element).find('.mq-menu').addClass('active');

  $('.fullscreen-label').removeClass('active');
  $(element).find('.fullscreen-label').addClass('active');

  // Make element the active media query
  if(makeActive){
    activeMQ = element;
  }
}
function calcMin(mqName){
  var minMQ = mediaQueryList.find(function(mq){
    return mq.size < returnMQ(clickedMQ).size;
  });

  if (minMQ){
    minWidth = minMQ.size + padding;
  } else {
    minWidth = minArtboardWidth;
  }
}
function calcMax(mqName){
  var reversedMQL = Array.prototype.slice.call(mediaQueryList).reverse();
  var maxMQ = reversedMQL.find(function(mq){
    return returnScale(mq.size) > returnMQ(clickedMQ).size;
  });

  if (maxMQ){
    maxWidth = maxMQ.size - padding;
  } else {
    maxWidth = canvasWidth;
  }
}

/* ====================== Events ====================== */

// Resize handles

$(document).on('mousedown', '.artboard-resizer', function(){
  // Allow for drag resizing of MQ
  canvasMouseDown = true;
  // Store canvas width because it changes depending on viewport
  canvasWidth = $('.canvas').width();

  $(this).addClass('handleActive');
});
$(document).on('mousedown', '.mq-resizer', function(){
  // Allow for drag resizing of MQ
  mqMouseDown = true;

  // Make MQ handle and labels visible
  $(this).addClass('handleActive');
  $(this).siblings('.label').addClass('handleActive');
});

// Drag events
$(document).on('mousemove', function(e){

  var mouseX = e.clientX - sidebarWidth;
  var offset = canvasWidth - mouseX;
  var resizedWidth = canvasWidth - 2*offset;

  // Artboard resize
  if (canvasMouseDown){

    $('.add-wrapper').addClass('active');
    // Canvas Resizing
    if (mouseX <= canvasWidth && resizedWidth >= returnScale(minArtboardWidth)){
      $(".artboard").css("width", resizedWidth);

      // Ruler shit
      $(".ruler").addClass('active');
      $(".ruler").css("left", offset-1);
      $('.artboard-width').addClass('active');

      $('.artboard-width').text(returnMultiplier(resizedWidth));

      var mq = mediaQueryList.find(function(mq, i) {
        var next = mediaQueryList[i + 1];
        if (!next) return true;
        return returnScale(mq.size) > resizedWidth && resizedWidth >= returnScale(next.size);
      });

      toggleMQ($('[data-id='+ mq.id +']'), true);
    }
    else if (mouseX > canvasWidth ){
      $(".artboard").css("width", canvasWidth);
    }
    else if (resizedWidth < returnScale(minArtboardWidth) ){
      $(".artboard").css("width", returnScale(minArtboardWidth));
    }
  }
  // Media query resize
  if (mqMouseDown){
    if (resizedWidth >= minWidth && resizedWidth <= maxWidth){
      resizeMQ(clickedMQ, resizedWidth);
    } else if (resizedWidth < minWidth) {
      resizeMQ(clickedMQ, minWidth);
    } else if (resizedWidth > maxWidth){
      resizeMQ(clickedMQ, maxWidth);
    }
  }
});

// Set active media query on click
$(document).on('mousedown', '.mq', function(e){
  // Store clickedMQ
  clickedMQ = $(this);

  // Set active MQ
  toggleMQ(this, true);

  // Set min and max width
  calcMin();
  calcMax();

  // Remove add icon
  $('.add-wrapper').removeClass('active');

  // Resize artboard to active width
  resizeMQ(this, $(this).width());

})

// Display MQ øn mouseover
$(document).on('mouseover', '.mq', function(){
  if (!canvasMouseDown && !mqMouseDown){
    toggleMQ(this);
  }
})

// Display Active MQ on mouseout
$(document).on('mouseout', '.mq', function(){
  toggleMQ(activeMQ);
})

// Disable drag events, etc
$(document).on('mouseup', function(){
  // Disallow drag events
  canvasMouseDown = false;
  mqMouseDown = false;

  // Ruler shit
  $(".ruler").removeClass('active');
  $('.artboard-width').removeClass('active');

  // Remove active state from handles
  $('.handleActive').removeClass('handleActive');
});


$('.add-control').on('click', function(){

  // Create media query
  var calculatedWidth = returnMultiplier($('.artboard').width());
  createMQ('New Breakpoint', calculatedWidth);

  // Make new media query active
  var newMQ = $('[data-id='+(mqCount-1)+']');
  toggleMQ(newMQ, true);

  // Remove add control
  $('.add-wrapper').removeClass('active');
});

$(document).on('click', '.mq-menu', function(e){
  e.stopPropagation();
  $(this).find('.mq-dropdown').addClass('active');
});

$(document).on('click', function(){
  $('.mq-dropdown.active').removeClass('active');
  $('.mq-dropdown.menu-open').removeClass('menu-open');
});

$(document).on('click', '[data-action="delete"]', function(){

  // Find the ID of index to be killed
  var mqID = clickedMQ.attr('data-id');
  var killIndex = mediaQueryList.findIndex(function(mq){
    return mq.id == mqID;
  });
  var newActiveId = mediaQueryList[killIndex-1].id;

  // Splice the index out of the array
  mediaQueryList.splice(killIndex, 1);

  // Refresh mq bar with new array list
  refreshMQ();

  // Toggle larger MQ
  toggleMQ($('[data-id='+newActiveId+']'), true);
  $(".artboard").css("width", activeMQ.width());
});

$('.scale-menu').on('click', function(e){
  e.stopPropagation();
  $('.mq-dropdown.scale').addClass('menu-open');
});

$('[data-action="scale-100"]').on('click', function(){
  scaleSite(1);
  $('.scale-menu').text('100%');
});

$('[data-action="scale-75"]').on('click', function(){
  scaleSite(.75);
  $('.scale-menu').text('75%');
});

$('[data-action="scale-50"]').on('click', function(){
  scaleSite(.5);
  $('.scale-menu').text('50%');
});

/* ====================== On load shit ====================== */

// Create media queries
createMQ('Fullscreen', 9999);
createMQ('Mobile - Landscape', 480);
createMQ('Tablet', 768);
// createMQ('Mobile - Landscape', 480);
createMQ('Mobile - Portrait', 320);

// Set fullscreen as default MQ
toggleMQ($('[data-id="0"]'), true);


/* ====================== Weird utility shit ====================== */

document.onselectstart = function(){ return false; }
