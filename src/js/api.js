const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/posts?limit=10");
  const data = await response.json();
  return data;
};

export { fetchPosts };
