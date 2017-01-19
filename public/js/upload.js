(function(){
  'use strict';
$('.upload-btn').on('click', function (){
    $('#upload').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});
$('.download-btn').on('click',function(){
  $(this).attr("disabled",true);
  $('.wait').show();
  $.ajax({
    url:'/generateReport',
    type:'GET',
    success:function(){
      $('.download-btn').attr("disabled",false);
      $('.wait').hide();
    }
  })
});
$('#upload').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){

    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      data.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!');
      },
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(event) {

          if (event.lengthComputable) {
            var percentComplete = event.loaded / event.total;
            percentComplete = parseInt(percentComplete * 100);
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }

          }

        }, false);

        return xhr;
      }
    });

  }
});
}());