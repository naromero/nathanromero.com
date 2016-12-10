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


/* ====================== MQ Functions ====================== */

function returnMQ(node){
  var mqName = $(node).attr('data-name');
  var result = $.grep(mediaQueryList, function(e){ return e.name == mqName; });
  return result[0];
}
function createMQ(name, size){
  
  // Decides which html to use for the mq
  var html;
  var id = mqCount;
  if (mqCount == 0){
    html = "<div class='mq' data-id='"+id+"' data-name='"+name+"' style='width:"+size+"px'><div class='fullscreen-label'></div><div class='fullscreen-label right'></div></div>";
  } else {
    html = "<div class='mq' data-id='"+id+"' data-name='"+name+"' style='width:"+size+"px'><div class='mq-resizer'></div><div class='label'>"+size+"</div><div class='label right'>"+size+"</div></div>";
  }
  
  // Create and add new MQ to list
  var mq = {
    name: name,
    size: size,
    html: html,
    id: id,
  }
  mediaQueryList.push(mq);
  
  // Refresh MQ bar with updated media query list  
  refreshMQ();
  
  // Update media query count
  mqCount++;
}
function refreshMQ(){
  $('.mq-holder').empty();
  for (i in mediaQueryList){
    $('.mq-holder').append(mediaQueryList[i]['html']);
  }
}
function resizeMQ(element, size){
  // Find and update MQL size
  var mq = returnMQ(element);
  mq['size'] = size;
  
  // Update MQ size and artboard size on canvas
  $(element).css('width', size);
  $(".artboard").css("width", size);
  $(element).find('.label').text(size);
  
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
  $(element).find('.label').addClass('active');
  $('.fullscreen-label').removeClass('active');
  $(element).find('.fullscreen-label').addClass('active');
  
  // Make element the active media query
  if(makeActive){
    activeMQ = element;
  }
}
function calcMin(i){
  var largerMQ  = parseInt(i)-1;
  var smallerMQ = parseInt(i)+1;
  
  if (i == 0){
    return mediaQueryList[smallerMQ]['size'] + padding;
  }
  else if (i == mediaQueryList.length-1){
    return 100 + padding;
  }
  else {
    return mediaQueryList[smallerMQ]['size'] + padding;
  }
}
function calcMax(i){
  var largerMQ  = parseInt(i)-1;
  var smallerMQ = parseInt(i)+1;
  
  if (i == 0){
    return canvasWidth - padding;
  }
  else if (i == mediaQueryList.length-1){
    return mediaQueryList[largerMQ]['size'] - padding;
  }
  else {
    return mediaQueryList[largerMQ]['size'] - padding;
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
    if (mouseX <= canvasWidth){
      $(".artboard").css("width", resizedWidth);
      $('.add-tooltip').addClass('active');
      $('.add-tooltip').text(resizedWidth);      
      
      var mq = mediaQueryList.find(function(mq, i) {
        var next = mediaQueryList[i + 1];
        if (!next) return true;
        return mq.size > resizedWidth && resizedWidth >= next.size;
      });      
      
      toggleMQ($('[data-id='+ mq.id +']'), true);      
    }
    else if (mouseX > canvasWidth ){
      $(".artboard").css("width", canvasWidth);
    }  
  }
  
  // Media query resize
  if (mqMouseDown){
    
    if (resizedWidth >= minWidth && resizedWidth <= maxWidth){
      resizeMQ(clickedMQ, resizedWidth);
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
  var index = $(this).attr('data-id');
  minWidth = calcMin(index);
  maxWidth = calcMax(index);
  
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
  
  // Hide add control
  $('.add-tooltip').removeClass('active');
  $('.add-tooltip').html('Insert Breakpoint');
  
  // Remove active state from handles
  $('.handleActive').removeClass('handleActive');
});

/* ====================== On load shit ====================== */

// Create media queries
createMQ('Fullscreen', canvasWidth);
createMQ('Tablet', 768);
createMQ('Mobile - Landscape', 480);
createMQ('Mobile - Portrait', 320);

// Set fullscreen as default MQ
toggleMQ($('[data-name="Fullscreen"]'), true);

/* ====================== Weird utility shit ====================== */

document.onselectstart = function(){ return false; }