import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { IMovieGenre } from "@/interfaces/movies.interfaces";
import { useQuery } from "@tanstack/react-query";
import { getMoviesGenres } from "@/services/moviesService";
import { AxiosError } from "axios";

type GenreSelectProps = {
  genre: string | null;
  setGenre: (genre: string) => void;
};

const GenresSelect = ({ genre, setGenre }: GenreSelectProps) => {
  const { data, isLoading, isError } = useQuery<
    { genres: IMovieGenre[] },
    AxiosError
  >({
    queryKey: ["getMovies"],
    queryFn: () => getMoviesGenres(),
  });

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <></>;
  }

  if (isLoading || isError) {
    return null;
  }

  const genresCollection = createListCollection({
    items: [
      { label: "All", value: "", group: "Movie Genres" },
      ...(data?.genres.map((genre) => ({
        label: genre.name,
        value: String(genre.id),
        group: "Movie Genres",
      })) ?? []),
    ],
  });

  return (
    <SelectRoot
      collection={genresCollection}
      width={"300px"}
      value={[genre ? genre : ""]}
      onValueChange={(e) => setGenre(e.value[0])}
    >
      <SelectTrigger>
        <SelectValueText placeholder="Select movie genre" />
      </SelectTrigger>
      <SelectContent>
        {genresCollection.items.map((genre) => (
          <SelectItem item={genre} key={genre.value}>
            {genre.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default GenresSelect;
