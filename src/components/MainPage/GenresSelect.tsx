import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

type GenreSelectProps = {
  genre: number | null;
  setGenre: React.Dispatch<React.SetStateAction<number | null>>;
};

const GenresSelect = ({ genre, setGenre }: GenreSelectProps) => {
  return (
    <>Selectgenre</>
    // <SelectRoot collection={pokemons} size="sm" width="320px">
    //   <SelectLabel>Select pokemon</SelectLabel>
    //   <SelectTrigger>
    //     <SelectValueText placeholder="Pokemon" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     {pokemons.items.map((pokemon) => (
    //       <SelectItem item={pokemon} key={pokemon.name}>
    //         {pokemon.name}
    //       </SelectItem>
    //     ))}
    //   </SelectContent>
    // </SelectRoot>
  );
};

export default GenresSelect;
