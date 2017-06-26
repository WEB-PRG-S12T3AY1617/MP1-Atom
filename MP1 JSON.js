var root = 'https://jsonplaceholder.typicode.com';
var conDiv1 = 1; //if div class1
var conDiv2 = 0; //if div class2
var mPhoto = 0; //if more photos
var mPost = 0; //if more posts

function userInfo (userId) {
  var b = userId
  console.log(userId);
  console.log(b);
  var uinfReq = new XMLHttpRequest();

};
//clears contents of container_div
function clearCont() {
  var parentDiv = document.getElementById('main_posts_div');
  while (parentDiv.hasChildNodes()) {
    parentDiv.removeChild(parentDiv.lastChild);
  }
};
//creates new div with child
function createNewElement() {
  var newP = document.createElement("p");
  var newHead = document.createElement("h2")
  var newDiv = document.createElement("div");
  var parentDiv = document.getElementById('main_posts_div');
  newHead.id = "section_header";
  newP.id = "post_1";
  newDiv.id = "post_con1"
  if(conDiv1 === 1)
    newDiv.className = "container_div";
  else {
    newDiv.className = "container_div2";
  }
  newDiv.appendChild(newP);
  parentDiv.appendChild(newHead);
  parentDiv.appendChild(newDiv);
};
//retrieves users
function retUser() {
  var count = 0;
  var reqUser = new XMLHttpRequest();
  reqUser.open('GET', root + '/users');
  reqUser.onload = function(){
    var userNme = JSON.parse(reqUser.responseText);
    while(count < userNme.length) {
      $("#post_1").append("<a id=" + "'" + userNme[count].id + "'" + "onClick='userInfo(this.id)'>" + userNme[count].name + "</a>"+ "</br>");
      count = count + 1;
    };
  };
  reqUser.send();
  if_empty = 1;
  currMenu = 1;
};
//retrieves photos
function retPhoto(mCount, numId) {
  var count = mCount;
  var reqPhoto = new XMLHttpRequest();
  reqPhoto.open('GET', root + '/photos');
  reqPhoto.onload = function () {
    var phThumb = JSON.parse(reqPhoto.responseText);
    while(count < (mCount + 9)) { // 9 pics max 1 div
      $("p:last").append("<img src=" + '"' + phThumb[count].thumbnailUrl + '"></img>');
      count = count + 1;
    };
    var moreBut = document.createElement("button");
    var butText = document.createTextNode("View More Photos");
    moreBut.appendChild(butText);
    moreBut.id = 'morePBut';
    $(moreBut).insertAfter(".container_div:last");
    //morePBut clicked
    $("#morePBut").click(function () {
      $(".container_div:first").clone().prop({ id: "post_con" + (numId + 1), name: "newName"}).appendTo("#main_posts_div");
      $("p:last").text("");
      $("#morePBut").remove();
      retPhoto(count, (numId + 1));
    });
  };
  reqPhoto.send();
};
//retrieves post
function retPost(mCount) {
  var count = mCount;
  var reqPost = new XMLHttpRequest();
  reqPost.open('GET', root + '/posts');
  reqPost.onload = function () {
    var nwPost = JSON.parse(reqPost.responseText);
    $(".container_div2:last").attr('id', nwPost[count].userId);
    while(count < (mCount + 10)) {
      $("<h5>" + nwPost[count].title + "</h5>").insertBefore("p:last");
      $("p:last").append(nwPost[count].body + "</br>");
      $("<a>" + nwPost[count].userId + "</a>").insertAfter("p:last");
      $(".container_div2:first").clone().prop({ id: nwPost[count + 1].userId, name: "newName"}).appendTo("#main_posts_div");
      $("p:last").text("");
      $("a:last").remove();
      $("h5:last").remove();
      count = count + 1;
    };
    $(".container_div2:last").remove();
    var moreBut = document.createElement("button");
    var butText = document.createTextNode("View More Posts");
    moreBut.appendChild(butText);
    moreBut.id = "moreBut";
    $(moreBut).insertAfter(".container_div2:last");
    //moreBut clicked
    $("#moreBut").click(function () {
      $(".container_div2:first").clone().prop({ id: nwPost[count + 1].userId, name: "newName"}).appendTo("#main_posts_div");
      $("p:last").text("");
      $("a:last").remove();
      $("h5:last").remove();
      retPost(count);
      $(moreBut).remove();
    });
  };
  reqPost.send();
};
function retAlbums(){
  var count = 0;
  var reqAlbums = new XMLHttpRequest();
  reqAlbums.open('GET', root + '/albums');
  reqAlbums.onload = function () {
    //pre walang thumbnails yung sa albums, bale yung thumbnail niya is isang random sample ng isang photo sa loob ng album.
    //Bale susubukan ko muna ayusin yung paglink ng mga anchors bago ko ito ayusin. para madali na lang yung pag link.
  }
};
$(document).ready(function(){
    //initial 10 posts
  window.onload = function () {
      createNewElement();
      var inCount = 10; // paano palabasin?
      var inReq = new XMLHttpRequest();
      inReq.open('GET', root + '/posts');
      inReq.onload = function () {
        var inPost = JSON.parse(inReq.responseText);
        while(inCount > 0) {
          $("post_1").append(inPost[inCount - 1].body + "</br>");
          inCount = inCount - 1;
        };
        inReq.send();
      };
    };
    //user_but clicked
    $("#user_but").click(function() {
      clearCont();
      conDiv2 = 1;
      conDiv1 = 0;
      createNewElement();
      $("#section_header").text("Users");
      retUser();
  });
  //post_but clicked
  $("#post_but").click(function () {
      clearCont();
      conDiv1 = 0;
      conDiv2 = 1;
      createNewElement();
      $("#section_header").text("Posts");
      retPost(0);
  });
  //photo_but clicked
  $("#photo_but").click(function () {
      clearCont();
      conDiv1 = 1;
      conDiv2 = 0;
      createNewElement();
      $("#section_header").text("Photos");
      retPhoto(0, 1);
  });
  //album_but clicked
  $("#album_but").click(function(){
    clearCont();
    conDiv1 = 1;
    conDiv2 = 0;
    createNewElement();
    $("#section_header").text("Albums");
    retAlbums();
  });
});
