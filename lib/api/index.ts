const initialHeaders: HeadersInit = {
  'Content-Type': 'application/json',
}

const getRequest = (url: string, headers: HeadersInit | undefined) => {
  return fetch(url, {
    method: 'GET',
    headers: headers || initialHeaders,
  });
}

const postRequest = (url: string, data: any, headers: HeadersInit | undefined) => {
  return fetch(url, {
    method: 'POST',
    headers: headers || initialHeaders,
    body: JSON.stringify(data),
  });
}

const request = {
  get: getRequest,
  post: postRequest,
}

export default request;
