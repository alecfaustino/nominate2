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
}

export default function CheckboxWrap({ array, trigger }: CheckboxWrapProps) {
  return (
    <div className="flex justify-center mb-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2 mb-4">
              {array.map((item) => (
                <div className="flex" key={item}>
                  <Checkbox key={item} id={item} />
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
