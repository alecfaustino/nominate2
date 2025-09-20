import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxWrapProps {
  array: string[];
  trigger: string;
  filterName: string;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export default function CheckboxWrap({
  array,
  trigger,
  filterName,
  setFilters,
}: CheckboxWrapProps) {
  const updateFilterArray = (key: string, value: string) => {
    setFilters((prev: any) => {
      const array: string[] = prev[key] || [];
      const updated = array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value];
      return { ...prev, [key]: updated };
    });
  };

  return (
    <div className="flex justify-center mb-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2 mb-4">
              {array.map((item) => (
                <div className="flex" key={item}>
                  <Checkbox
                    key={item}
                    id={item}
                    onCheckedChange={() => updateFilterArray(filterName, item)}
                  />
                  <Label htmlFor={item} className="ml-2">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
