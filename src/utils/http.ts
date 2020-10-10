/**
 *
 * @param url URL of the web page
 * @param retries Number of retries if the request fails
 * @returns The HTML string
 */
const fetchPage = async (url: string, retries = 3): Promise<string> => {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    if (!retries) {
      throw new Error(`HTTP Error: ${error.message}`);
    }
  }
  return fetchPage(url, retries - 1);
};

export default fetchPage;
