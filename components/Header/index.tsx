import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function Header({ routeLabel }: { routeLabel?: string }) {
  const title = "Who's Your Main?";
  const fullLabel = routeLabel ? `${title}/${routeLabel}` : title;

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Label className="text-3xl">{fullLabel}</Label>
        <a href="/choose-game">
          <Button>Add a main</Button>
        </a>
      </div>
      <hr />
    </>
  );
}
