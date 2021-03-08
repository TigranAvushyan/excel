export class ActiveRoute {
  static get PATH() {
    return window.location.hash.slice(1)
  }

  static get PARAM() {
    return ActiveRoute.PATH.split('/')
  }
}
