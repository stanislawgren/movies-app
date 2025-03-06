import { IMovieDetails } from "@/interfaces/movies.interfaces";
import { getMovieDetails } from "@/services/moviesService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  Button,
} from "@chakra-ui/react";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { data } = useQuery<IMovieDetails, AxiosError>({
    queryKey: ["getMovieDetails", id],
    queryFn: () => getMovieDetails(id ? parseInt(id) : 0),
  });

  return (
    <Box className="rounded-2xl shadow-lg overflow-hidden">
      <Button
        variant="outline"
        color="gray.300"
        borderColor="gray.600"
        _hover={{ bg: "gray.700" }}
        className="mt-4 self-start m-6"
      >
        Wróć
      </Button>
      <Flex direction={{ base: "column", md: "row" }} className="h-full gap-8">
        <Box className="w-full md:w-1/3 p-6 flex flex-col items-center md:items-start">
          <Image
            src={`https://image.tmdb.org/t/p/w185/${data?.poster_path}`}
            alt={data?.title}
            className="w-full object-cover rounded-2xl"
          />
        </Box>

        <Box className="w-full md:w-2/3">
          <Stack direction="row" className="mb-6">
            <Flex align="center">
              <Heading
                as="h1"
                size="xl"
                className="text-gray-200 text-center w-full"
              >
                {data?.title}
              </Heading>
            </Flex>
            <Flex align="center">
              <Text fontSize="lg" className="text-gray-300">
                {data?.release_date}
              </Text>
            </Flex>
          </Stack>

          <Text className="text-gray-400 mb-8 text-lg">{data?.overview}</Text>

          <Text fontSize="lg" className="text-gray-300">
            {data?.vote_average}/10
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default MovieDetailsPage;
