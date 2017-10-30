export default class RouterLogger{
  constructor(tag){
    this.tag = tag
    this.log = this.log.bind(this)
  }

  log(req, res, next) {
    console.log(this.tag, req.method, req.url);
    next();
  }
}