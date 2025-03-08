import { Box, Image, Flex, Heading, Badge, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { IMovie } from "@/interfaces/movies.interfaces";
import { useNavigate } from "react-router";

const MovieListItem = ({ movie }: { movie: IMovie }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();

  return (
    <Box
      className="rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl max-w-64 cursor-pointer h-full flex flex-col"
      bg={cardBg}
      onClick={() => {
        navigate(`/movie/${movie.id}`);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title + "_poster"}
        className="w-full object-cover"
        loading="lazy"
      />
      <Box p={4} className="flex flex-col flex-1">
        <Flex justify="space-between" align="center" mb={2}>
          <Heading size="lg">{movie.title}</Heading>
        </Flex>
        <Flex justify="space-between" align="center" mt="auto">
          <Text fontWeight="bold">{movie.vote_average.toFixed(1)}/10</Text>
          <Badge>{movie.release_date}</Badge>
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieListItem;
