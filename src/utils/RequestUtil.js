import RequestBuilder from "@/libs/RequestBuilder";

function getRequest(url, contentType, token) {
  const requestParams = {
    headers: RequestBuilder.setHeaders(contentType, token),
    method: "GET"
  };
  return RequestBuilder.handleRequest(url, requestParams);
}

function postRequest(url, contentType, token, data) {
  const requestParams = {
    headers: RequestBuilder.setHeaders(contentType, token),
    method: "POST",
    body: RequestBuilder.setBody(contentType, data)
  };
  return RequestBuilder.handleRequest(url, requestParams);
}

function deleteRequest(url, contentType, token, data = {}) {
  const hasBody = (Object.keys(data).length > 0);
  const requestParams = {
    headers: RequestBuilder.setHeaders(contentType, token),
    method: "DELETE",
    body: (hasBody ? RequestBuilder.setBody(contentType, data) : null)
  };
  return RequestBuilder.handleRequest(url, requestParams);
}

function putRequest(url, contentType, token, data) {
  const requestParams = {
    headers: RequestBuilder.setHeaders(contentType, token),
    method: "PUT",
    body: RequestBuilder.setBody(contentType, data)
  };
  return RequestBuilder.handleRequest(url, requestParams);
}

export { getRequest, postRequest, deleteRequest, putRequest };
