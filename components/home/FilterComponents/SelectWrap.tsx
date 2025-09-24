import { Filters } from "@/app/types/filters";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SetStateAction } from "react";

type SelectWrapProps = {
  array: string[];
  placeholder: string;
  setFilters: React.Dispatch<SetStateAction<Partial<Filters>>>;
};

export default function SelectWrap({
  array,
  placeholder,
  setFilters,
}: SelectWrapProps) {
  return (
    <div className="flex justify-center mb-4">
      <Select
        onValueChange={(value) =>
          setFilters((prev: Partial<Filters>) => ({
            ...prev,
            [placeholder.toLowerCase()]: value === "" ? undefined : value,
          }))
        }>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{placeholder}</SelectLabel>
            <SelectItem value="clear">No Preference</SelectItem>
            {array.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
