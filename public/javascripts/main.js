$(document).on('click', '#submit', function() {
    var blurEffect = 2;
    var saturationValue = 1;

    var img = document.getElementById("img");
    var originalImg = document.getElementById("original");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var file_url = $('#file_url').val();
    console.log('file_url is: ', file_url);

    function drawRect(x, y, width, height) {
        context.fillStyle = "#FF0000";
        context._blurRect(x, y, width, height, blurEffect, saturationValue);
    }
    function getResizedCoords(x, y, width, height) {
    }
    
    img.onload = function() {
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;
        context.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
    };
    img.src = file_url;
    img.crossOrigin = 'Anonymous';
    originalImg.src = file_url;

    
    $.ajax({
      type: "GET",
      url: "upload?file_url=" + file_url,
      success: function(data) {
          var output = data.output;
          var overall_score = output.nsfw_score;
          var detections = output.detections;

          for(var i = 0; i < detections.length; i++) {
            var box = detections[i].bounding_box;
            // console.log('(detections[i].name.toLowerCase()).indexOf(covered)', (detections[i].name.toLowerCase()).indexOf('Covered'));
            if(detections[i].confidence >= 0.5 && (detections[i].name.toLowerCase()).indexOf('covered') < 0)
                drawRect(box[0], box[1], box[2], box[3]);
          }


          
          console.log('data: ', data);
      }
    });
})

