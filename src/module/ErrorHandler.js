export default class ErrorHandler {
  static apiHandleErr(error) {
    throw new Error(error);
  }
}
