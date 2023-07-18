import testData from "./testData";

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(testData),
});

export default mockFetch;
