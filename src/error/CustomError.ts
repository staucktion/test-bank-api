class CustomError {
  private errorType: string;
  private className: string;
  private methodName: string;
  private error: any;

  constructor(errorType:string ,className: string, methodName: string, error: Error) {
    this.errorType = errorType;
    this.className = className;
    this.methodName = methodName;
    this.error = error;
  }

  async throwError() {
    let errorMessage = `${this.className}.${this.methodName}: ${this.errorType}: `;
    if (this.error.response)
      errorMessage += JSON.stringify(this.error.response.data, null, 2);
    else if (this.error.code) errorMessage += this.error.code;
    throw new Error(errorMessage);
  }
}

export default CustomError;
