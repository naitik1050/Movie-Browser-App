import {useState} from 'react';
import {AxiosResponse} from 'axios';
import axiosInstance from '../helper/axiosInstance';

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = async (url: string, page = 1) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axiosInstance.get(url, {
        params: {page: page, language: 'en-US'},
      });

      if (page === 1) {
        setData(response.data.results || response.data);
      } else {
        setData(prevData => [
          ...(prevData || []),
          ...(response?.data?.results || []),
        ]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const loadMoreData = (url: string) => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchData(url, nextPage);
  };

  const resetPagination = (url: string) => {
    setCurrentPage(1);
    fetchData(url);
  };

  return {fetchData, resetPagination, loadMoreData, data, loading, error};
};

export default useFetch;
