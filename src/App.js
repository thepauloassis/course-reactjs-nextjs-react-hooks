import P from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const Post = ({ post, handleClick }) => {
  console.log('Son, rendered');
  return (
    <div key={post.id} className="post">
      <h1 style={{ fontSize: '14px' }} onClick={() => handleClick(post.title)}>
        {post.title}
      </h1>
      <p>{post.body}</p>
    </div>
  );
};

Post.propTypes = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string,
  }),
  handleClick: P.func,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  const input = useRef(null);
  const contador = useRef(0);
  console.log('Father, rendered');

  // Component did mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.json())
      .then((r) => setPosts(r));
  }, []);

  useEffect(() => {
    input.current.focus();
    console.log(input.current);
  }, [value]);

  useEffect(() => {
    contador.current++;
  });

  const handleClick = (value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <h1>Rendered: {contador.current}x</h1>
      <p>
        <input ref={input} type="search" value={value} onChange={(e) => setValue(e.target.value)} />
      </p>

      {useMemo(() => {
        return posts.length > 0 && posts.map((post) => <Post key={post.id} post={post} handleClick={handleClick} />);
      }, [posts])}
      {posts.length <= 0 && <p>No posts</p>}
    </div>
  );
}

export default App;
