class CustomError {
  private errorType: string;
  private className: string;
  private methodName: string;
  private error: any | null;
  private message: string;

  constructor(errorType: string, className: string, methodName: string, error: Error | null, message: string) {
    this.errorType = errorType;
    this.className = className;
    this.methodName = methodName;
    this.error = error;
    this.message = message;
  }

  static builder() {
    return new CustomErrorBuilder();
  }

  throwError() {
    let errorMessage = `${this.errorType} -> ${this.className}.${this.methodName}: `;

    if (this.error?.response)
      errorMessage += "Response:\n" + JSON.stringify(this.error.response.data, null, 2);
    else if (this.error?.code) 
      errorMessage += this.error.code;

    if (this.message) errorMessage += this.message;

    throw new Error(errorMessage);
  }
}

class CustomErrorBuilder {
  private errorType: string;
  private className: string;
  private methodName: string;
  private error: Error | null;
  private message: string;

  setErrorType(errorType: string): CustomErrorBuilder {
    this.errorType = errorType;
    return this;
  }

  setClassName(className: string): CustomErrorBuilder {
    this.className = className;
    return this;
  }

  setMethodName(methodName: string): CustomErrorBuilder {
    this.methodName = methodName;
    return this;
  }

  setError(error: Error | null): CustomErrorBuilder {
    this.error = error;
    return this;
  }

  setMessage(message: string): CustomErrorBuilder {
    this.message = message;
    return this;
  }

  build(): CustomError {
    return new CustomError(
      this.errorType,
      this.className,
      this.methodName,
      this.error,
      this.message
    );
  }
}

export default CustomError;