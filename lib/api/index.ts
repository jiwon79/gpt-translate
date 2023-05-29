export interface BasicResponse {
  statusCode: number;
}

const initialHeaders: HeadersInit = {
  'Content-Type': 'application/json',
}

const responseBody = async (response: Response) => {
  const responseJson = await response.json();

  return Object.assign(responseJson, { statusCode: response.status });
}

const getRequest = (url: string, headers: HeadersInit = initialHeaders) => {
  return fetch(url, {
    method: 'GET',
    headers: headers,
  }).then(responseBody);
}

const postRequest = (url: string, data: {}, headers: HeadersInit = initialHeaders) => {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  }).then(responseBody);
}

const request = {
  get: getRequest,
  post: postRequest,
}

export default request;
