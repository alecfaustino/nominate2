import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DietaryAccordionProps {
  readyInMinutes: number;
  servings: number;
  diets?: string[];
  cuisines?: string[];
}
export default function DietaryAccordion({
  readyInMinutes,
  servings,
  diets,
  cuisines,
}: DietaryAccordionProps) {
  return (
    <div className="flex-start w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Dietary Information</AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>Ready in: {readyInMinutes} minutes</li>
              <li>Servings: {servings}</li>
              {diets?.length && <li>Diets: {diets.join(", ")}</li>}
              {(cuisines?.length ?? 0) > 0 ? (
                <li>Cuisines: {cuisines?.join(", ")}</li>
              ) : null}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
