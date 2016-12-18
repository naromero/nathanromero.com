// Variables
var $passwordField = $('[data-name=password-field]');
var $passwordInput = $('[data-name="password"]');
var $fieldToggle = $('[data-name="toggle"]');
var $pwToggle = $('.visibility-toggle');
var pwSelected = false;
var pwCleared = false;

// Triggers
$fieldToggle.on('click', function(){
  if (this.checked){
    $passwordField.removeClass('hidden');
    $(this).siblings('label').text('ON');
  } else {
    $passwordField.addClass('hidden');
    $(this).siblings('label').text('OFF');
  }
});

$passwordInput.on('click', function(){
  if(!pwCleared){
    this.select();
    pwSelected = true;
  }
});

$passwordInput.on('keydown', function(){
  if (pwSelected) {
    $(this).val('');
    pwCleared = true;
    pwSelected = false;
  }
  
});

