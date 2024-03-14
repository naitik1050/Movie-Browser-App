import axios, {AxiosInstance, AxiosResponse} from 'axios';

interface CustomParams {
  [key: string]: string | number | boolean;
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2Y5YmM2YmQ2ZGNhNWE2ZGM3NjAwZGU4NzZjZWNmNyIsInN1YiI6IjY1ZjAyYmQyNjZhN2MzMDE3YmRlZjQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PnsBymCP4hw_5M9eD1vi3nlN7ZXUUIyQIvBGXUUgnVc',
  },
});

// Function to make a GET request
export const get = async <T>(
  url: string,
  params: CustomParams = {},
): Promise<AxiosResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url, {params});
    return response;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
