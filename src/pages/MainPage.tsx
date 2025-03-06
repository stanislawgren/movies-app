import { getMovies } from "@/services/moviesService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MainPage = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMovies", page],
    queryFn: () => getMovies(page),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  console.log(data);

  return (
    <div>
      <p>LISTA FILMOW</p>
      <button onClick={() => setPage((page) => page + 1)}>next</button>
      <p>page: {page}</p>
      <button onClick={() => setPage((page) => (page === 1 ? 1 : page - 1))}>
        prev
      </button>
    </div>
  );
};

export default MainPage;
