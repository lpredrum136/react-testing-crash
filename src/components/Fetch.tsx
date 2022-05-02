import { useFetch } from '../hooks/useFetch';

const Fetch = () => {
  const { data, loading } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return loading ? (
    <h1>LOADING.....................................</h1>
  ) : (
    <ul>
      {data.map((post) => (
        <li id={post.id.toString()}>{post.title}</li>
      ))}
    </ul>
  );
};

export default Fetch;
