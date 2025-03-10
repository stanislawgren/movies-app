import { IMovieDetails, IMovieGenre } from "@/interfaces/movies.interfaces";
import { getMovieDetails } from "@/services/moviesService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  Badge,
} from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery<
    IMovieDetails,
    AxiosError
  >({
    queryKey: ["getMovieDetails", id],
    queryFn: () => getMovieDetails(id ? parseInt(id) : 0),
  });

  if (isLoading) {
    return (
      <Box
        height="100vh"
        className="flex flex-col items-center justify-center"
        p={6}
      >
        <Box className="max-w-5xl flex flex-col h-full md:h-min" gap={6}>
          <Flex
            direction={{ base: "column", md: "row" }}
            className="h-full gap-6"
            mt={24}
          >
            <Box
              display={"flex"}
              flexDir={"column"}
              p={6}
              className="w-full md:w-1/3 items-center md:items-start"
            >
              <Skeleton height="400px" width="16rem" borderRadius="2xl" />
            </Box>
            <Box className="w-full md:w-2/3">
              <Skeleton
                height="50px"
                width={{ base: "16rem", md: "32rem" }}
                borderRadius="2xl"
                mb={6}
              />
              <Skeleton
                height="200px"
                width={{ base: "16rem", md: "32rem" }}
                borderRadius="2xl"
                mb={6}
              />
              <Skeleton
                height="50px"
                width={{ base: "16rem", md: "32rem" }}
                borderRadius="2xl"
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        height="100vh"
        className="flex flex-col items-center justify-center"
        p={6}
      >
        <Heading as="h1" size="5xl" className="text-gray-500 text-center">
          Something went wrong
        </Heading>
      </Box>
    );
  }

  const generateGenres = (genres: IMovieGenre[]) => {
    return genres.map((genre) => {
      return (
        <Badge size={"lg"} bgColor={"black"} key={genre.id}>
          {genre.name}
        </Badge>
      );
    });
  };

  return (
    <Box
      height="100vh"
      className="flex flex-col items-center justify-center"
      p={6}
    >
      <Box
        className="max-w-5xl flex h-full md:h-min"
        flexDir={"column"}
        gap={6}
      >
        <Button
          variant="subtle"
          bgColor={"black"}
          _hover={{ bg: "gray.800" }}
          className="mt-4 self-start m-6"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <Flex
          direction={{ base: "column", md: "row" }}
          className="h-full gap-6"
        >
          <Box className="w-full md:w-1/3 p-6 flex flex-col items-center md:items-start">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              alt={data?.title}
              className="w-full object-cover rounded-2xl"
              loading="lazy"
              border={"2px solid black"}
            />
          </Box>

          <Box className="w-full md:w-2/3">
            <Heading as="h1" size="5xl" className="text-gray-200 text-left">
              {data?.title}
            </Heading>
            <Box className="rounded-2xl" bgColor="gray.800" p={6} mt={2} mb={2}>
              <Text>{data?.overview}</Text>
            </Box>
            <Text>{"Duration: " + data?.runtime + " minutes"}</Text>
            <Stack direction="row" gap={3} mt={3} mb={3} flexWrap={"wrap"}>
              {data?.genres && generateGenres(data?.genres)}
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              pt={3}
              pb={6}
              borderTop={"1px solid"}
              borderColor={"gray.800"}
            >
              <Badge size={"lg"} bgColor={"black"}>
                ⭐{" " + data?.vote_average.toFixed(1)}/10
              </Badge>
              <Badge size={"lg"} bgColor={"black"}>
                {data?.release_date}
              </Badge>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieDetailsPage;
