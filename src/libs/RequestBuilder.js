class RequestBuilder {

  static setHeaders(contentType, token = "") {
    const showHeaders = (contentType && contentType !== "none");
    let headers = {};
    if (showHeaders) {
      headers["Content-Type"] = contentType;
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  static setBody(contentType, data) {
    if (contentType === "application/json") {
      return JSON.stringify(data);
    }
    return data;
  }

  static handleRequest(requestUrl, requestParams) {
    return fetch(requestUrl, requestParams)
      .then(this.handleError)
      .then(this.handleResponse)
      .catch(() => {
        return null;
      });
  }

  static handleError(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  static handleResponse(response) {
    return response.json();
  }
}

export default RequestBuilder;
