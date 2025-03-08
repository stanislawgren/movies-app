import MovieListItem from "@/components/MainPage/MovieListItem";
import { IMoviesList } from "@/interfaces/movies.interfaces";
import { getMovies } from "@/services/moviesService";
import {
  Box,
  Flex,
  Group,
  SimpleGrid,
  Skeleton,
  Heading,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { AxiosError } from "axios";
import GenresSelect from "@/components/MainPage/GenresSelect";
import { useSearchParams } from "react-router";

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedGenre = searchParams.get("genre") || "";

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), genre: selectedGenre });
  };

  const handleGenreChange = (genre: string) => {
    setSearchParams({ page: "1", genre: genre });
  };

  const { data, isLoading, isError, error } = useQuery<IMoviesList, AxiosError>(
    {
      queryKey: ["getMovies", currentPage, selectedGenre],
      queryFn: () => getMovies(currentPage, selectedGenre),
    }
  );

  if (isError) {
    console.log(error);
    return <>Something went wrong</>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Flex
        pt={6}
        maxWidth={"8xl"}
        className="w-full p-6"
        direction={{ base: "column", md: "row", xl: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading as="h1" size="5xl" className="text-gray-200 text-left">
          Movie List Task
        </Heading>
        <GenresSelect genre={selectedGenre} setGenre={handleGenreChange} />
      </Flex>
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
        page={currentPage}
        onPageChange={(e) => {
          handlePageChange(e.page);
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
