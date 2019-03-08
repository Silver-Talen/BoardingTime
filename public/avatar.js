const avatarData,
avatar_nose,
avatar_mouth,
color,
avatar_eyes,
request = new XMLHttpRequest();
 
loadData();
 
const loadData = () => {
  request.open('GET', 'https://api.adorable.io/avatars/face/' + avatar_eyes + '/' + avatar_nose + '/' + avatar_mouth + '/' + color);
  request.onload = loadComplete;
  request.send();
}
 
const loadComplete = evt => {
  avatarData = JSON.parse(request.responseText);
  console.log(avatarData);
}