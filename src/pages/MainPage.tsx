import MovieListItem from "@/components/MainPage/MovieListItem";
import { IMoviesList } from "@/interfaces/movies.interfaces";
import { getMovies } from "@/services/moviesService";
import { Box, Group, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { AxiosError } from "axios";
import GenresSelect from "@/components/MainPage/GenresSelect";

const MainPage = () => {
  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState<number | null>(null);

  const { data, isLoading, isError, error } = useQuery<IMoviesList, AxiosError>(
    {
      queryKey: ["getMovies", page],
      queryFn: () => getMovies(page),
    }
  );

  if (isError) {
    console.log(error);
    return <>Niestety coś poszło nie tak</>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <GenresSelect genre={genre} setGenre={setGenre} />
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4, lg: 5 }}
        gap="2rem"
        maxWidth={"fit-content"}
        p={6}
      >
        {isLoading
          ? new Array(20).fill(null).map((_, index) => (
              <Box
                key={index}
                className="rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl max-w-64 cursor-pointer h-full flex flex-col"
              >
                <Skeleton height="400px" width="64rem" borderRadius="2xl" />
              </Box>
            ))
          : data?.results.map((movie, index) => {
              return <MovieListItem movie={movie} key={index} />;
            })}
      </SimpleGrid>
      <PaginationRoot
        mb={6}
        className="w-fit"
        count={data?.total_results ? data.total_results : 0}
        pageSize={20}
        page={page}
        onPageChange={(e) => {
          setPage(e.page);
        }}
      >
        <Group attached>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </Group>
      </PaginationRoot>
    </div>
  );
};

export default MainPage;
