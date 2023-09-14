import { twMerge as tm } from "tailwind-merge";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function TemplateCard({ meme, isSelected, markTemplate }) {
  /* const cardClasses =
    "relative grid w-full min-h-[6rem] md:min-h-[12rem] 2xl:min-h-[16rem] max-w-[28rem] items-end justify-center overflow-hidden text-center cursor-pointer"; */

  const cardClasses =
    "relative grid w-full h-full max-w-[28rem] items-end justify-center text-center cursor-pointer !rounded bg-clip-box overflow-hidden";

  return (
    <Card
      shadow={false}
      className={tm(cardClasses, isSelected && "border-4 border-gray-100")}
      onClick={(e) => markTemplate(meme.id)}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute m-0 h-full w-full rounded-none bg-cover bg-center"
        style={{ backgroundImage: `url('${meme.url}')` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative max-w-full overflow-hidden !p-0 md:px-12">
        <Typography
          variant="small"
          color={isSelected ? "white" : "gray"}
          className={tm(
            "break-words font-mono text-sm",
            isSelected ? "text-xl font-bold lg:text-2xl" : "font-medium",
          )}
        >
          {meme.name}
        </Typography>
      </CardBody>
    </Card>
  );
}
