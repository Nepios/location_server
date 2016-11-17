$(document).ready(function () {
  $('select').on('change', function(){
    var id = $('select[name=location]').val();
    $('#selected').html('');
    $('#descendants').html('');
    
    function showResult(result){
      $('#selected').append("<ul>" + result.location + "</ul>");
      for (var i = 0; i <result.descendants.length; i++){
        $('#descendants').append("<li>" + result.descendants[i] + "</li>");
      }
    };
    
    function getLocation(num, callback){
      return $.ajax({
        method: "GET",
        dataType: "json",
        url: "http://localhost:3000/location/" + num, 
        success: callback
      });
    };
    getLocation(id,showResult);
  });
});