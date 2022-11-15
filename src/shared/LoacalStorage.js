import jwt_decode from 'jwt-decode'

export const setStorage = (key, value) => {
  localStorage.setItem(key, value)
}
export const getStorage = (key) => {
  return localStorage.getItem(key)
}
export const clearStorage = () => {
  // to keep draft save
  var draft = localStorage.getItem('draft');
  localStorage.clear();
  localStorage.setItem('draft', draft);
}
export const IsAdmin = () => {
  return false;
  var token = localStorage.getItem('token')
  var decoded = jwt_decode(token)
  if (decoded.roleId === '2') {
    return true
  } else {
    return false
  }
}
export const getUserId = () => {
  var token = localStorage.getItem('token')
  var decoded = jwt_decode(token)
  return decoded.userId;
}

