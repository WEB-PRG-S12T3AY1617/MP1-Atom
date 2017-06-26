var root = 'https://jsonplaceholder.typicode.com';
var conDiv1 = 0; //if div class1
var conDiv2 = 0; //if div class2
var inState = 1;
//retrieves photo information
function getPhInf (phId) {
  clearCont();
  conDiv1 = 1;
  conDiv2 = 0;
  createNewElement();
  $(".container_div").css("height", "700px");
  $(".container_div").css("width", "700px");

  var phReq = new XMLHttpRequest();
  var albReq = new XMLHttpRequest();
  var useReq = new XMLHttpRequest();
  var phInf;
  var alInf;
  var useInf;
  phReq.open('GET', root + '/photos/?id=' + phId);
  phReq.onload = function () {
    phInf = JSON.parse(phReq.responseText);
    $("p:last").append("<img src=" + '"' + phInf[0].url + '"' + "></img></br>");
    $("p:last").append(phInf[0].title + "</br>");
    albReq.open('GET', root + '/albums/?id=' + phInf[0].albumId);
    albReq.onload = function () {
      alInf = JSON.parse(albReq.responseText);
      $("p:last").append("Album: " + "<a id =" + '"' + alInf[0].id + '"' + "onClick =" + '"' + "getAlbInf(this.id)" + '">' + alInf[0].title + "</a></br>");
      useReq.open('GET', root + '/users/?id=' + alInf[0].userId);
      useReq.onload = function () {
        useInf = JSON.parse(useReq.responseText);
        $("p:last").append("Author: " + "<a id =" + '"' + useInf[0].id + '"' + "onClick =" + '"' + "userInfo(this.id)" + '">' + useInf[0].name + "</a>");
        $("#post_1 a").css("color", "#84b3ff");
      };
      useReq.send();
    };
    albReq.send();
  };
  phReq.send();
};

function getAlbInf(albId){
  clearCont();
  conDiv1 = 1;
  conDiv2 = 0;
  createNewElement();
  $(".container_div").css("height", "800px");
  $(".container_div").css("width", "1600px");
  // $(".container_div").css("flex-direction", "row");

  var phReq = new XMLHttpRequest();
  var phInf;
  var alInf;
  var useInf;
  var count = 1;

  phReq.open('GET', root + '/photos/?albumId=' + albId);
  phReq.onload = function () {
    phInf = JSON.parse(phReq.responseText);
    while(count <= (albId * 50))
    {
      $("p:last").append("<img src=" + '"' + phInf[(count - 1)].thumbnailUrl + '"' + "id = " + '"' + count + '"' + "onClick = " + '"' + "getPhInf(this.id)" + '"' + "></img>");
      count = count + 1;
    };

  };
  phReq.send();
};

//retrieves user
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
  $(".container_div2").css("padding", "10px");
  $(".container_div2").css("border", "10px");
  $(".container_div2").css("border", "10px solid #a6e6fc");
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
      $("p:last").append("<img src=" + '"' + phThumb[count].thumbnailUrl + '"' + "id =" + '"' + phThumb[count].id + '"' + "class =" + '"' + phThumb[count].albumId + '"' + "onClick='getPhInf(this.id)'></img>");
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
  var reqUser = new XMLHttpRequest();
  var userNme;
  reqPost.open('GET', root + '/posts');
  reqPost.onload = function () {
    var nwPost = JSON.parse(reqPost.responseText);
    $(".container_div2:last").attr('id', nwPost[count].userId);
    while(count < (mCount + 10)) {
      $("<h5>" + nwPost[count].title + "</h5>").insertBefore("p:last");
      $("p:last").append(nwPost[count].body + "</br>");
      reqUser.open('GET', root + '/users/?id=' + nwPost[count].userId, false);
      reqUser.onload = function () {
        userNme = JSON.parse(reqUser.responseText);
        $("<a id =" + '"' + userNme[0].id + '"' + "onClick=" + '"' + "userInfo(this.id)" + '"' + ">" + userNme[0].name + "</a>").insertAfter("p:last");
      };
      reqUser.send();
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
function retAlbums(mCount, numId){
  var count = mCount;//0
  var albCount = numId;
  var reqAlbums = new XMLHttpRequest();
  reqAlbums.open('GET', root + '/photos');
  reqAlbums.onload = function () {
    var phThumb = JSON.parse(reqAlbums.responseText);
    while(count < (mCount + 5)) { // 5 thumbnails per div
      $("p:last").append("<img src=" + '"' + phThumb[count].thumbnailUrl + '"' + "id =" + '"' + albCount + '"' + "class =" + '"' + phThumb[count].albumId + '"' + "onClick='getAlbInf(this.id)'></img>"); //work on this after making getAlbInf
      count = count + 1;
    };
    count = count + 45;
    var moreBut = document.createElement("button");
    var butText = document.createTextNode("View More Albums");
    moreBut.appendChild(butText);
    moreBut.id = 'moreAlBut';
    $(moreBut).insertAfter(".container_div:last");
    $("#moreAlBut").click(function () {
      $(".container_div:first").clone().prop({ id: numId + 1, name: "newName"}).appendTo("#main_posts_div");
      $("p:last").text("");
      $("#moreAlBut").remove();
      retAlbums(count, (numId + 1));
    });
  };
  reqAlbums.send();
};

function initialStat(mCount) {
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
  var reqUser = new XMLHttpRequest();
  var userNme;
  reqPost.open('GET', root + '/posts');
  reqPost.onload = function () {
    var nwPost = JSON.parse(reqPost.responseText);
    $(".container_div2:last").attr('id', nwPost[count].userId);
    while(count >=(vCount - 9)) {
      $("<h5>" + nwPost[count].title + "</h5>").insertBefore("p:last");
      $("p:last").append(nwPost[count].body + "</br>");
      reqUser.open('GET', root + '/users/?id=' + nwPost[count].userId, false);
      reqUser.onload = function () {
          userNme = JSON.parse(reqUser.responseText);
          $("<a id =" + '"' + userNme[0].id + '"' + "onClick=" + '"' + "userInfo(this.id)" + '"' + ">" + userNme[0].name + "</a>").insertAfter("p:last");
      };
      reqUser.send();
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
      retAlbums(0,1);
    });
});
