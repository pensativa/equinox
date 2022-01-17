$(document).ready(function() {
  showPolygons();
  setInterval(function(){
    showPolygons();
  },3500)
})

function showPolygons() {

  $('[class="processed"]').removeAttr('class');
  var polyCount = $('path').length;

  $('path').each(function(ind, el) {
    setTimeout(function() {
       $('path:eq(' + ind + ')').attr('class', 'processed');
    }, Math.random() * 2000);
  });
}
