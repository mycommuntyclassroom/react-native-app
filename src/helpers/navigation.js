export function goToScene (scene, props = {}) {
  this.refs.navigator.push({ scene, props })
};