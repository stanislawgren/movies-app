import { createListCollection, SelectItemGroup } from "@chakra-ui/react";
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

interface Category {
  group: string;
  items: {
    label: string;
    value: string;
    group: string;
  }[];
}

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
    items:
      data?.genres.map((genre) => ({
        label: genre.name,
        value: String(genre.id),
        group: "Movie Genres",
      })) ?? [],
  });

  const categories: Category[] = genresCollection.items.reduce<Category[]>(
    (acc, item) => {
      const group = acc.find((g) => g.group === item.group);
      if (group) {
        group.items.push(item);
      } else {
        acc.push({ group: item.group, items: [item] });
      }
      return acc;
    },
    []
  );

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
        {categories.map((category) => (
          <SelectItemGroup key={category.group}>
            {category.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectItemGroup>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default GenresSelect;
