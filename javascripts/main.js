
  function NavBar(){
    $(window).scroll(function(){
      if ($(window).scrollTop() > 50){
        $("#navbar").removeClass('full');
        $("#navbar").addClass('shrink');
      } else {
        $("#navbar").removeClass('shrink');
        $("#navbar").addClass('full');
      }
    })
  }

  $(document).ready(function(){
    $(window).scroll(function(){
      NavBar();
    })
  })
