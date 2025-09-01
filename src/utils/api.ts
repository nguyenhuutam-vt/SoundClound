import queryString from "query-string";
import slugify from "slugify";

// Add the IRequest type definition if not already present
export interface IRequest {
  url: string;
  method: string;
  body?: any;
  queryParams?: Record<string, any>;
  useCredentials?: boolean;
  headers?: Record<string, string>;
  nextOption?: Record<string, any>;
}

export const sendRequest = async <T>(props: IRequest) => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options: any = {
    method: method,
    // by default setting the content-type to be json type
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
    ...nextOption,
  };
  if (useCredentials) options.credentials = "include";

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as T;
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        } as T;
      });
    }
  });
};

export const sendRequestUpload = async <T>(props: IRequest) => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options: any = {
    method: method,
    headers: new Headers({ ...headers }),
    body: body ? body : null,
    ...nextOption,
  };
  if (useCredentials) options.credentials = "include";

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as T;
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        } as T;
      });
    }
  });
};

export const fetchDefaultImg = (type: string) => {
  if (type === "GITHUB") {
    return "data:image/png;base64,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";
  } else if (type === "GOOGLE") {
    return "data:image/png;base64,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";
  }
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/chill1.png`;
};

export const convertSlugUrl = (str: string) => {
  return slugify(str, { lower: true, locale: "vi" });
};
