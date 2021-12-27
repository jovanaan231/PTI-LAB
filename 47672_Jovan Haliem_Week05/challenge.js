function generateUserTable(data){
    let idx = 0;
    let tbody = document.getElementById('users').querySelector('tbody');
    tbody.innerHTML = '';
    for(idx = 0; idx < data.length; idx++){
        let colID = '<td>'+data[idx].id+'</td>';
        let colName = '<td>'+data[idx].name+'</td>';
        let colEmail = '<td>'+data[idx].email+'</td>';
        let colCompanyName = '<td>'+data[idx].company.name+'</td>';
        let btnShowPost = '<td><button class="button-posts" userId='+data[idx].id
                            +' onclick="loadPosts('+data[idx].id    
                            +')">Show Posts</button></td>';
        
        let newRow = '<tr>'+colID+colName+colEmail+colCompanyName+btnShowPost+'</tr>';
        tbody.innerHTML += newRow;
    }
}
function loadUserData(){
    let request = new XMLHttpRequest();
    let url = 'https://jsonplaceholder.typicode.com/users';
    request.open('GET', url, true);

    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let data = JSON.parse(request.responseText);
            //console.log(data);
            generateUserTable(data);
        }
        else{
            alert('Page Not Found');
        }
    }
    request.onerror = function(){
        alert('Request Failed! Check your internet connection');
    }
    request.send();
}
function loadPosts(id){
    let request = new XMLHttpRequest();
    let url = 'https://jsonplaceholder.typicode.com/posts/?userId=1';
    request.open('GET', url, true);

    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let data = JSON.parse(request.responseText);
            showPosts(data);
        }
        else{
            alert('Page Not Found');
        }
    }
    request.onerror = function(){
        alert('Request Failed! Check your internet connection');
    }
    request.send();
}
function showPosts(data){
    let idx = 0;
    let tbody = document.getElementById("user-posts").querySelector("tbody");
    tbody.innerHTML = "";
    for (idx = 0; idx < data.length; idx++){
      let colID = "<div >" + data[idx].id + "</div>";
      let colTitle =
        '<strong><h3>TITLE : "' + data[idx].title + '"</h3></strong>';
      let colBody = "<div style='padding:30px;'>" + data[idx].body + "</div>";
      let btnShowComments = '<div><button class="btn-comments" postId=' +data[idx].id +
                            ' onclick="loadComments(' +data[idx].id 
                            +')">Show Comments</button></div>';
      let newRow = "<div class='card' id='comments'>" +colTitle+colBody+btnShowComments+"</div>";
      tbody.innerHTML += newRow;
    }
}
function showComments(data) {
    let idx = 0;
    let bodyComment = document.getElementById("comments");
    let bodyPosts = document.getElementById("user-posts");
    bodyPosts.innerHTML = "";
    bodyComment.removeChild(bodyComment.childNodes[2]);
    let Pre = "<h3>Comments: <h3>";
    let Content = '<div class="style-comment">';
    for (idx = 0; idx < data.length; idx++){
      Content += `<p><span font-weight="bold">${data[idx].name}(${data[idx].email})</span>commented:"${data[idx].body}"</p>`;
    }
    Content += "</div>";
    bodyComment.innerHTML += Pre + Content;
    bodyPosts.innerHTML +="<div class='card' id='comments'>" +bodyComment.innerHTML+"</div>";
}
function loadComments(id) {
    let request = new XMLHttpRequest();
    let url ="https://jsonplaceholder.typicode.com/posts/1/comments/?postId=3" +id;
    request.open("GET", url, true);
    request.onload = function (){
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        showComments(data);
      }
      else {
        alert("Page Not Found");
      }
    };
    request.onerror = function(){
      alert("Request Failed! Check your internet connection");
    };
    request.send();
}
function onDocumentFinish() {
    loadUserData();
}
  