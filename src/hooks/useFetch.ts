import { useEffect, useState } from 'react';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(url);
      const data = (await response.json()) as Post[];
      setData(data);
      setLoading(false);
    };

    sendRequest();
  }, []);

  return { data, loading };
};
