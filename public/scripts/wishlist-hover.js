$(document).ready(function() {

$(".fa-heart").mouseover(function() {
  $(this).css({
    color: "red"
  })
})

$(".fa-heart").mouseleave(function() {
  $(this).css({
    color: "blue"
  })
})

})
