var root = 'https://jsonplaceholder.typicode.com';
var if_empty = 0;
var conDiv1 = 1;
var conDiv2 = 0;

$(document).ready(function(){
    //initial 10 posts
    var inCount = 10; // paano palabasin?
    var inReq = new XMLHttpRequest();
    inReq.open('GET', root + '/posts');
    inReq.onload = function () {
      var inPost = JSON.parse(inReq.responseText);
      while(inCount > 0) {
        $("post_1").append(inPost[inCount - 1].body + "</br>");
        inCount = inCount - 1;
      };
      if_empty = 1;
      inReq.send();
    };
    //user_but clicked
    $("#user_but").click(function() {
      $(".container_div").addClass("container_div2").removeClass("container_div");
      $("#section_header").text("Users");
      conDiv2 = 1;
      conDiv1 = 0;
      retUser();
  });
  //retrieves users
  function retUser() {
    if(if_empty !== 0) {
      clearCont();
    }
    var count = 0;
    var reqUser = new XMLHttpRequest();
    reqUser.open('GET', root + '/users');
    reqUser.onload = function(){
      var userNme = JSON.parse(reqUser.responseText);
      while(count < userNme.length) {
        $("#post_1").append(userNme[count].name + "</br>");
        count = count + 1;
      };
    };
    reqUser.send();
    if_empty = 1;
  };
  //post_but clicked
  $("#post_but").click(function () {
      if(conDiv1 === 0)
        $(".container_div2").addClass("container_div").removeClass("container_div2");
      conDiv1 = 1;
      conDiv2 = 0;
      $("#section_header").text("Posts");
      retPost();
  });
  //retrieves post
  function retPost() {
    if(if_empty !== 0) {
      clearCont();
    }
    var count = 0;
    var reqPost = new XMLHttpRequest();
    reqPost.open('GET', root + '/posts');
    reqPost.onload = function () {
      var nwPost = JSON.parse(reqPost.responseText);
      while(count < 10) {
        $("#post_1").append(nwPost[count].body + "</br>");
        count = count + 1;
      };
    };
    if_empty = 1;
    reqPost.send();
  };
  //photo_but clicked
  $("#photo_but").click(function () {
      if(conDiv1 === 0)
        $(".container_div2").addClass("container_div").removeClass("container_div2");
      conDiv1 = 1;
      conDiv2 = 0;
      $("#section_header").text("Photos");
      retPhoto();
  });
  //retrieves photos
  function retPhoto() {
    if(if_empty !== 0) {
      clearCont();
    }
    var count = 0;
    var reqPhoto = new XMLHttpRequest();
    reqPhoto.open('GET', root + '/photos');
    reqPhoto.onload = function () {
      var phThumb = JSON.parse(reqPhoto.responseText);
      while(count < 9) { // 9 pics max 1 div
        $("#post_1").append("<img src=" + '"' + phThumb[count].thumbnailUrl + '"></img>');
        count = count + 1;
      };
    };
    if_empty = 1;
    reqPhoto.send();
  };
  //clears contents of container_div
  function clearCont() {
    $("#post_1").text("");
  };

});
