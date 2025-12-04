export default async function http(method, url, data = null, token = null) {

 const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

   // If URL does not start with http, prepend the base URL
  const finalUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(finalUrl, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json().catch(() => null); // handle empty responses (e.g. DELETE)
}
