export const myFetch = async (endpoint) => {
  const url = `http://localhost:8080/${endpoint}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
  // return response;
}