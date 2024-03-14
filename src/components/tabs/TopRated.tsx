import React, {useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
import {Flatlist} from '../FlatList';

export function TopRated() {
  const apiendpoint = 'movie/top_rated';
  const {fetchData, resetPagination, loadMoreData, data, loading, error} =
    useFetch();

  useEffect(() => {
    fetchData(apiendpoint);
  }, []);

  return (
    <Flatlist
      data={data}
      loading={loading}
      error={error}
      onEndReached={() => loadMoreData(apiendpoint)}
      onRefresh={() => resetPagination(apiendpoint)}
    />
  );
}