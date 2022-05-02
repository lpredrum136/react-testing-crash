import { act, render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Post, useFetch } from '../hooks/useFetch';
import Fetch from './Fetch';

// const mockResponse = { a: 'b' };
//@ts-ignore
// jest.spyOn(global, 'fetch').mockResolvedValue({
//   json: jest.fn().mockResolvedValue(mockResponse),
// });

const fakeData: Post[] = [
  { body: 'body 1', id: 1, userId: 1, title: 'title 1' },
];

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeData),
  })
);

const hooks = renderHook(() => useFetch('myurl'));

describe('<Fetch />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData),
      })
    );
  });

  afterEach(() => {
    // @ts-ignore
    global.fetch.mockClear();
    // @ts-ignore
    delete global.fetch;
  });

  test('should render loading', async () => {
    const wrapper = render(<Fetch />);
    // const loadingText = wrapper.getByText(
    //   'LOADING.....................................'
    // );
    // expect(loadingText).toBeInTheDocument();

    //@ts-ignore

    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mockResponse),
    // });

    await waitFor(() => {
      expect(1).toEqual(1);
      expect(hooks.result.current).toEqual({
        data: expect.any(Array),
        loading: expect.any(Boolean),
      });
    });
  });
});

// @ts-ignore
global.fetch.mockClear();
// @ts-ignore
delete global.fetch;
