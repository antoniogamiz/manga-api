import axios from "axios";

const AxiosInstance = axios.create();

/**
 *
 * @param url URL of the web page
 * @param retries Number of retries if the request fails
 * @returns The HTML string
 */
const fetchPage = async (url: string, retries = 3): Promise<string> => {
  const response = await AxiosInstance.get(url);
  if (response.status === 200) return response.data;
  if (!retries)
    throw Error(`HTTP Error: code: ${response.status} ${response.statusText}`);
  return fetchPage(url, retries - 1);
};

export default fetchPage;
