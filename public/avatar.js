var avatarData;
var avatar_eyes;
var avatar_nose;
var avatar_mouth;
var color;
var request = new XMLHttpRequest();
 
loadData();
 
function loadData() {
  request.open('GET', 'https://api.adorable.io/avatars/face/' + avatar_eyes + '/' + avatar_nose + '/' + avatar_mouth + '/' + color);
  request.onload = loadComplete;
  request.send();
}
 
function loadComplete(evt) {
  avatarData = JSON.parse(request.responseText);
  console.log(avatarData);
}