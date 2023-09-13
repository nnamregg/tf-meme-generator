import { twMerge as tm } from "tailwind-merge";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function TemplateCard({ meme, isSelected, markTemplate }) {
  const cardClasses =
    "relative grid w-full min-h-[6rem] md:min-h-[12rem] 2xl:min-h-[16rem] max-w-[28rem] items-end justify-center overflow-hidden text-center cursor-pointer";
  

  return (
    <Card
      shadow={false}
      className={tm(cardClasses, isSelected && "border-4 border-teal-400")}
      onClick={(e) => markTemplate(meme.id)}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
        style={{ backgroundImage: `url('${meme.url}')` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative !p-2 md:px-12">
        <Typography
          variant="small"
          color={isSelected ? "teal" : "white"}
          className={tm("text-sm", isSelected ? "font-bold" : "font-medium")}
        >
          {meme.name}
        </Typography>
      </CardBody>
    </Card>
  );
}
