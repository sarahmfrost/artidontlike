
const csvPath = "/../static/data/random_image.csv"

var allFilePaths = []
var randomNineFilePaths = []
var selectedPaintings = []



var myvar = '<div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
'  <div class="modal-dialog" data-dismiss="modal">'+
'    <div class="modal-content"  >              '+
'      <div class="modal-body">'+
'       <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>'+
'        <img src="" class="imagepreview" style="width: 100%;height: 100%" >'+
'      </div> '+
'      <div class="modal-footer">'+
'          <div class="col-xs-12">'+
'               <p class="text-left"></p>'+
''+
'          </div>'+
''+
'      </div>'+
'          '+
'          '+
'    </div>'+
'  </div>'+
'</div>';

function readCSVToArray(path, delimter)
{
    var filePaths = []
    $.ajax({
        type: "GET",
        url: path,
        dataType: "text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(artCollection) {
              filePaths = artCollection.split(delimter);
              //filePaths = artCollection.split(' ');
              // console.log(filePaths)

        }
  });
  return filePaths
}

function getRandomNinePaths(filePaths)
{
    var randomNumber = [];
    var randomFilePaths = [];

    for (var i=0; i<9; i++)
      randomNumber.push(Math.floor(Math.random() * filePaths.length)) // removed plus one

    $.each(randomNumber, function(index, value){
        randomFilePaths.push(filePaths[value]);
    });

    return randomFilePaths;
    //console.log("random paths are", randomFilePaths)
}

function drawPaintings(paintings)
{

    $.each(paintings, function(i, painting){
        $('#painting'+i).html('<a href="#" class="pop"><img src="/../static/data/style/'+painting+'"/></a>'+myvar)
        //$('#painting'+i).html('<a href="#" class="pop"><img src="static/data/style/'+painting+'"/></a>'+myvar)
    });
}

function getRandomPaintingsAndDraw()
{
   //console.log(allFilePaths)
   randomNineFilePaths = getRandomNinePaths(allFilePaths)
   drawPaintings(randomNineFilePaths);
   console.log("randomNineFilePaths are ", randomNineFilePaths)
}

function checkIfEmpty()
{
	if(selectedPaintings.length < 3)
	{

		$('#submitButton').hide()

	} else{

		$('#submitButton').show()
	}
}


allFilePaths = readCSVToArray(csvPath, ' ')
getRandomPaintingsAndDraw();
checkIfEmpty()



$('.grid-item').on('click', '.pop', function(e) {
    e.stopPropagation();
    $('.imagepreview').attr('src', $(this).find('img').attr('src'));
    $('#imagemodal').modal('show');


    var imgPath2 = $(this).find('img').attr('src'); //this will have to have the /../ removed
    var imgPath = (imgPath2.replace("/../",""));

    //console.log("imgPath is", imgPath);

});

$('.grid-item').on("click",'.modal', function(e) {
    e.stopPropagation();
});



$('#likeButton').on("click", function(e){
  var selectedItem = $(".grid-item")[0]['children'][0]["firstChild"]['attributes'][0].value
  //console.log("selected item is ", selectedItem)

  selectedPaintings.push(selectedItem)
  //show another image
  getRandomPaintingsAndDraw();
  //console.log("selected paintings are", selectedPaintings)

	checkIfEmpty()

});

$('#dislikeButton').click(function(){
  //show another image
  getRandomPaintingsAndDraw();

  checkIfEmpty()


});



$('#submitButton').click(function(){



    $.ajax({
        url: "/artILike",
        type: "POST",
        data: JSON.stringify({imagePath: selectedPaintings}),
        cache: false,
        contentType: false,
        processData: false,
        async:false,
        dataType: 'json',
        success: function (result) {
         console.log(result.artist);
         $('#outputImageDiv').show()
         var path = "/../static/data/csv/"+result.artist+".csv" //removed slash before static - sf 2/6, readded /../ SF - 2/24
         console.log("path is ", path)
         var allPathsFromArtist = readCSVToArray(path,' ')
         console.log('all paths from artist are', allPathsFromArtist)
         var randomPath =allPathsFromArtist[Math.floor(Math.random() * allPathsFromArtist.length)]//took out 1
         console.log('lenghth of allpathsfromartist struggle =', Math.floor(Math.random() * allPathsFromArtist.length)) //took out 1
         console.log('random path is', randomPath)
         console.log("full path is", 'static/data/artist/'+result.artist+'/'+randomPath)


         //Code for parsing jpg name into info

        $('#wontlikeThisDiv').show()
        $('#outputImage').show()
		$('#textResult').show()
		$('#paintingNameDiv').show()
		$('#newArtistPathDiv').show()
        $('#burgerIcon').show()

        var newArtistPath = ((result.artist).replace("_"," "));
        var newArtistPath2 = ((newArtistPath).replace("_"," "));

        //var newArtistPath3 = (newArtistPath).replace("_"," ")

        var newRandomPath1 = randomPath.replace(/.*_/g, "");

        var newRandomPath2 = newRandomPath1.replace(/.jpg/g, "");

        var newRandomPath3 = newRandomPath2.replace(/(-)+/g, " ");

        var newRandomPath4 = newRandomPath3.replace(/[0-9]/g, "");

        var yearOfPaintingNum = newRandomPath3.match(/(\d+)/);



        console.log('new random path', newRandomPath3)


         $('#artInfoText').html('<br>' + "The artist is " + newArtistPath2  +  '<br>' + "The name of the art is " + newRandomPath4);
         //

         $('#newPaintingName').html(newRandomPath4);
         $('#newArtistPath').html(newArtistPath2);

         if(yearOfPaintingNum != null){
         	console.log('year is', yearOfPaintingNum[0])
         	 $('#yearOfPainting').html(yearOfPaintingNum[0]);
         }


         d = new Date();
            //$('#outputImage').attr('src', 'static/data/style/'+randomPath)
            //$('#outputImage').attr('src', 'static/data/artist/'+result.artist+'/'+randomPath)
            //$('#outputImage').attr('src', '/../../static/data/artist/'+result.artist+'/'+randomPath) // sarah changed on 2/24

            //changed all artist files to be lower case - sf 4/7
            $('#outputImage').attr('src', '/static/data/artist/'+result.artist+'/'+randomPath) // sarah changed on 4/7

            $('#likeButtonDiv').hide()
            $('#dislikeButtonDiv').hide()
            $('#painting1.grid-item').hide()
            $('#text.grid-item').hide()
            $('#YouLike').hide()
            $('#submitButtonDiv').hide()



        },
    });
})


$('#wontlikeThisDiv').hide()
$('#outputImage').hide()
$('#textResult').hide()
$('#paintingNameDiv').hide()
$('#newArtistPathDiv').hide()
$('#burgerIcon').hide()
