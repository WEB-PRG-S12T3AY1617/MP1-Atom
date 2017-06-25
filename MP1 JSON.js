var root = 'https://jsonplaceholder.typicode.com';
var conDiv1 = 1; //if div class1
var conDiv2 = 0; //if div class2

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
    function createNewElement() {
      var newP = document.createElement("p");
      var newHead = document.createElement("h2")
      var newDiv = document.createElement("div");
      var parentDiv = document.getElementById('main_posts_div');
      newHead.id = "section_header";
      newP.id = "post_1";
      if(conDiv1 === 1)
        newDiv.className = "container_div";
      else {
        newDiv.className = "container_div2";
      }
      newDiv.appendChild(newP);
      parentDiv.appendChild(newHead);
      parentDiv.appendChild(newDiv);
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
  //retrieves users
  function retUser() {
    var count = 0;
    var reqUser = new XMLHttpRequest();
    reqUser.open('GET', root + '/users');
    reqUser.onload = function(){
      var userNme = JSON.parse(reqUser.responseText);
      while(count < userNme.length) {
        $("#post_1").append("<a>" + userNme[count].name + "</a>"+ "</br>");
        count = count + 1;
      };
    };
    reqUser.send();
    if_empty = 1;
    currMenu = 1;
  };
  //post_but clicked
  $("#post_but").click(function () {
      clearCont();
      conDiv1 = 0;
      conDiv2 = 1;
      createNewElement();
      $("#section_header").text("Posts");
      retPost();
  });
  //retrieves post
  function retPost() {
    var count = 0;
    var reqPost = new XMLHttpRequest();
    reqPost.open('GET', root + '/posts');
    reqPost.onload = function () {
      var nwPost = JSON.parse(reqPost.responseText);
      $(".container_div2:last").attr('id', nwPost[count].userId);
      while(count < 10) {
        $("<h5>" + nwPost[count].title + "</h5>").insertBefore("p:last");
        $("p:last").append(nwPost[count].body + "</br>");
        $("<a>" + nwPost[count].userId + "</a>").insertAfter("p:last");
        count = count + 1;
        $(".container_div2:last").clone().prop({ id: nwPost[count].userId, name: "newName"}).appendTo("#main_posts_div");
        $("p:last").text("");
        $("a:last").remove();
        $("h5:last").remove();
      };
      $(".container_div2:last").remove();
    };
    reqPost.send();
  };
  //photo_but clicked
  $("#photo_but").click(function () {
      clearCont();
      conDiv1 = 1;
      conDiv2 = 0;
      createNewElement();
      $("#section_header").text("Photos");
      retPhoto();
  });
  //retrieves photos
  function retPhoto() {
    var count = 0;
    var reqPhoto = new XMLHttpRequest();
    reqPhoto.open('GET', root + '/photos');
    reqPhoto.onload = function () {
      var phThumb = JSON.parse(reqPhoto.responseText);
      while(count < 9) { // 9 pics max 1 div
        $("#post_1").append("<img src=" + '"' + phThumb[count].thumbnailUrl + '"></img>');
        count = count + 1;
      };
      $(".container_div").clone().prop({ id: "newId1", name: "newName"}).appendTo("#main_posts_div");
      $("#newId1 p").text("");
      $("#newId1 p").append("<img src=" + '"' + phThumb[count].thumbnailUrl + '"></img>');
      $("#newId1 p").append("<img src=" + '"' + phThumb[11].thumbnailUrl + '"></img>');
      $("#newId1 p").append("<img src=" + '"' + phThumb[12].thumbnailUrl + '"></img>');
    };
    reqPhoto.send();
  };
  //clears contents of container_div
  function clearCont() {
    var parentDiv = document.getElementById('main_posts_div');
    while (parentDiv.hasChildNodes()) {
      parentDiv.removeChild(parentDiv.lastChild);
    }
  };

});
