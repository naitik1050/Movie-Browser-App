import {renderHook, act} from '@testing-library/react-hooks';
import axiosInstance from '../src/helper/axiosInstance'; // Adjust the path as needed
import useFetch from '../src/hooks/useFetch';

// Mock Axios response
const mockResponse = {
  data: {
    results: [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
    ],
  },
};

jest.mock('../src/helper/axiosInstance', () => ({
  get: jest.fn(),
}));

describe('useFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data successfully', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce(mockResponse);
    const {result, waitForNextUpdate} = renderHook(() => useFetch());
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
    act(() => {
      result.current.fetchData('/test-url');
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockResponse.data.results);
    expect(result.current.error).toBeNull();
  });

  it('handles error when fetching data', async () => {
    const errorMessage = 'Error fetching data';
    (axiosInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );
    const {result, waitForNextUpdate} = renderHook(() => useFetch());
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
    act(() => {
      result.current.fetchData('/test-url');
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error.message).toBe(errorMessage);
  });

  it('loads more data successfully', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce(mockResponse);
    const {result, waitForNextUpdate} = renderHook(() => useFetch());
    expect(result.current.data).toEqual([]);
    await waitForNextUpdate();
    expect(result.current.data).toEqual(expect.arrayContaining(mockResponse.data.results.concat(mockResponse.data.results)));
    act(() => {
      result.current.loadMoreData('/test-url');
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(
      expect.arrayContaining(
        mockResponse.data.results.concat(mockResponse.data.results),
      ),
    );
  });

  it('resets pagination successfully', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce(mockResponse);
    const {result, waitForNextUpdate} = renderHook(() => useFetch());
    expect(result.current.data).toEqual([]);
    act(() => {
      result.current.fetchData('/test-url'); 
    });

    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockResponse.data.results);
    act(() => {
      result.current.loadMoreData('/test-url');
    });

    await waitForNextUpdate();
    expect(result.current.data).toEqual(
      expect.arrayContaining(
        mockResponse.data.results.concat(mockResponse.data.results),
      ),
    );
    act(() => {
      result.current.resetPagination('/test-url');
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(expect.arrayContaining(mockResponse.data.results.concat(mockResponse.data.results)));
  });
});
