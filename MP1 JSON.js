var root = 'https://jsonplaceholder.typicode.com';
var if_empty = 0;

$(document).ready(function(){
    //user_but clicked
    $("#user_but").click(function() {
      $("#section_header").text("Users");
      retUser();
  });
  //retrieves users
  function retUser() {
    if(if_empty !== 0) {
      clearCont();
    }
    var n = 0;
    var reqUser = new XMLHttpRequest();
    reqUser.open('GET', root + '/users');
    reqUser.onload = function(){
      var userNme = JSON.parse(reqUser.responseText);
      while(n < userNme.length) {
        $("#post_1").append(userNme[n].name + "</br>");
        n = n + 1;
      };
    };
    reqUser.send();
    if_empty = 1;
  };
  //post_but clicked
  $("#post_but").click(function () {
      $("#section_header").text("Posts");
      retPost();
  });
  //retrieves post
  function retPost() {
    alert('post section');
    if(if_empty !== 0) {
      clearCont();
    }
    // create new div for post
  };
  //clears contents of container_div
  function clearCont() {
    $("#post_1").text("");
    alert('now empty');
  };

});
