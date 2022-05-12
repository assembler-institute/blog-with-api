const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/posts?limit=10");
  const data = await response.json();
  return data;
};

const fetchUser = async (userId) => {
  return await fetch(`http://localhost:3000/users?id=${userId}`)
    .then((response) => response.json())
    .then((data) => data);
  //   const data = await response.json();
  //   return data;
};

export { fetchPosts, fetchUser };
