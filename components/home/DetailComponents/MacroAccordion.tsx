import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MacroAccordionProps {
  array: {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds?: number;
  }[];
}

export default function MacroAccordion({ array }: MacroAccordionProps) {
  return (
    <div className="flex-start w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Macro Nutrients</AccordionTrigger>
          <AccordionContent>
            <ul>
              {array?.map((item, idx) => (
                <li key={idx}>
                  {item.name}: {item.amount} {item.unit}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
