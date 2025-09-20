import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface InstructionsAccordionProps {
  array: {
    number: number;
    step: string;
  }[];
}

export default function InstructionsAccordion({
  array,
}: InstructionsAccordionProps) {
  console.log("Array from inside InstructionsAccordion:", array);
  return (
    <div className="flex-start w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Instructions</AccordionTrigger>
          <AccordionContent>
            <ol>
              {array.map((item, idx) => (
                <li key={idx}>
                  Step {item.number}: {item.step}
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
