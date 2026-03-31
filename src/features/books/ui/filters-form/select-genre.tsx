import { GENRES_BOOKS } from "@/shared/constants/genres";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";

export function SelectGenre() {
  return (
    <Select items={GENRES_BOOKS}>
      <SelectTrigger>
        <SelectValue placeholder="Select a genre" />
      </SelectTrigger>
      <SelectContent>
        {GENRES_BOOKS.map((genre) => (
          <SelectItem key={genre.value} value={genre.value}>
            {genre.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
