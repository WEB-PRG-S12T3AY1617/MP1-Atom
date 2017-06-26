var root = 'https://jsonplaceholder.typicode.com';
var conDiv1 = 0; //if div class1
var conDiv2 = 0; //if div class2
var inState = 1;

function getUser (userId) {
  var uinfReq = new XMLHttpRequest();
  var userNme;
  uinfReq.open('GET', root + '/users/?id=' + userId);
  uinfReq.onload = function(){
    userNme = JSON.parse(uinfReq.responseText);
  };
  console.log(typeof userNme);
  uinfReq.send();
};
//retrieves user information
function userInfo (userId) {
  clearCont();
  conDiv2 = 1;
  conDiv1 = 0;
  createNewElement();
  var uinfReq = new XMLHttpRequest();
  uinfReq.open('GET', root + '/users/?id=' + userId);
  uinfReq.onload = function(){
    var userProf = JSON.parse(uinfReq.responseText);
    $(".container_div2").css("text-align", "left");
    $(".container_div2").css("padding", "10px");
    $(".container_div2").css("border", "10px");
    $(".container_div2").css("border", "10px solid #a6e6fc");
    $(".container_div2").css("height", "250px");
    $("#section_header").text(userProf[0].name);
    $("#post_1").append("ID: " + userProf[0].id + "</br>");
    $("#post_1").append("Username: " + userProf[0].username + "</br>");
    $("#post_1").append("Email: " + userProf[0].email + "</br>");
    $("#post_1").append("Address: " + userProf[0].address.street + "," + userProf[0].address.suite + "," + userProf[0].address.city + "," + userProf[0].address.zipcode +"</br>");
    $("#post_1").append("Phone: " + userProf[0].phone + "</br>");
    $("#post_1").append("Website: " + userProf[0].website + "</br>");
    $("#post_1").append("Company: " + userProf[0].company.name + "</br>");
    $("#post_1").append(" &emsp;" + userProf[0].company.catchPhrase + "</br>");
    $("#post_1").append(" &emsp;" + userProf[0].company.bs + "</br>");
  };
  uinfReq.send();
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
  var userNme;
  var count = mCount;
  var reqPost = new XMLHttpRequest();
  reqPost.open('GET', root + '/posts');
  reqPost.onload = function () {
    var nwPost = JSON.parse(reqPost.responseText);
    $(".container_div2:last").attr('id', nwPost[count].userId);
    while(count < (mCount + 10)) {
      // userNme = getUser(nwPost[count].userId);
      // console.log(userNme);
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
function initialStat(mCount) {
  var userNme;
  if(inState === 1) {
    conDiv1 = 0;
    conDiv2 = 1;
    createNewElement();
    var count = 99;
  }
  else {
    var count = mCount;
  }
  var vCount = count;
  var reqPost = new XMLHttpRequest();
  reqPost.open('GET', root + '/posts');
  reqPost.onload = function () {
    var nwPost = JSON.parse(reqPost.responseText);
    $(".container_div2:last").attr('id', nwPost[count].userId);
    console.log(vCount - 9);
    while(count >=(vCount - 9)) {
      $("<h5>" + nwPost[count].title + "</h5>").insertBefore("p:last");
      $("p:last").append(nwPost[count].body + "</br>");

      $("<a>" + nwPost[count].userId + "</a>").insertAfter("p:last");

      $(".container_div2:first").clone().prop({ id: nwPost[count].userId, name: "newName"}).appendTo("#main_posts_div");
      $("p:last").text("");
      $("a:last").remove();
      $("h5:last").remove();
      count = count - 1;
    };
    $(".container_div2:last").remove();
    var moreBut = document.createElement("button");
    var butText = document.createTextNode("View More Posts");
    moreBut.appendChild(butText);
    moreBut.id = "moreBut";
    $(moreBut).insertAfter(".container_div2:last");
    //moreBut clicked
    $("#moreBut").click(function () {
      inState = 0;
      $(".container_div2:first").clone().prop({ id: nwPost[count].userId, name: "newName"}).appendTo("#main_posts_div");
      $("p:last").text("");
      $("a:last").remove();
      $("h5:last").remove();
      initialStat(count);
      $(moreBut).remove();
    });
  };
  reqPost.send();
}
$(document).ready(initialStat);
$(document).ready(function () {
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
