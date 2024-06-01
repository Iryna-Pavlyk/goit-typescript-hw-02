import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY = "rBCsC-fJjRfqVZySZ3J3YLmA7m9I9IPv0mcMXek3qBU";

export type APIresponse = {
  results: APIresults[];
  total: number;
  total_pages: number;
};

export type APIresults = {
  alt_description: string;
  urls: { small: string; regular: string };
  user: { name: string; location: string; id: string };
  likes: number;
};

export const fetchPhotos = async (
  searchQuery: string,
  currentPage: number
): Promise<APIresults[]> => {
  const response: AxiosResponse<APIresponse> = await axios.get(
    "search/photos",
    {
      params: {
        query: searchQuery,
        page: currentPage,
        per_page: 15,
        client_id: ACCESS_KEY,
        orientation: "landscape",
      },
    }
  );
  return response.data.results;
};
