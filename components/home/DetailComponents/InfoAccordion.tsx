import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface InfoAccordionProps {
  trigger: string;
  array: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];
}

export default function InfoAccordion({ trigger, array }: InfoAccordionProps) {
  return (
    <div className="flex-start w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>
            <ul>
              {array.map((item, idx) => (
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
