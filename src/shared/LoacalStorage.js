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
