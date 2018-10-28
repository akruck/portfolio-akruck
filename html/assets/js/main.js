// ---------- ---------- ---------- ---------- ----------
// loader
// ---------- ---------- ---------- ---------- ----------


// Fade Out function
// ---------- ---------- ---------- ---------- ----------
function fadeOut(ms, el) {
  var opacity  = 1,
      interval = 50,
      gap      = interval / ms;

  function func() {
    opacity -= gap;
    el.style.opacity = opacity;

    if(opacity <= 0) {
      window.clearInterval(fading);
      el.style.display = 'none';
    }
  }
  var fading = window.setInterval(func, interval);
}

// Define transition function
// ---------- ---------- ---------- ---------- ----------
function loaded() {
  // Define our variables
  var docBody  = document.body,
      anchors  = document.getElementsByTagName('a');

  // Add loaded class to body
  docBody.className += ' loaded';

  // For each link
  for (var i = 0; i < anchors.length; i++) {

    // Click function
    anchors[i].onclick = function(e) {

      // Cache our anchor
      var el = this;

      // Stop default action
      e.preventDefault();

      // Fade out body
      fadeOut(150, docBody);

      // Change page after fade out
      setTimeout( function() { location = el.href }, 150 );
    }
  }
}

// Fire transition function
window.onload = loaded;


// ---------- ---------- ---------- ---------- ----------
// smooth scrolling
// ---------- ---------- ---------- ---------- ----------

// Tania - https://codepen.io/taniarascia/
// https://codepen.io/taniarascia/pen/MJEXZj
$(function() {
  $("button[href^='#']").click(function(e) {
  	e.preventDefault();

  	var position = $($(this).attr("href")).offset().top;

  	$("body, html").animate({
  		scrollTop: position
  	} , 1600 );
  });
});
