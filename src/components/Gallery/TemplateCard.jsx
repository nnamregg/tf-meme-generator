import { useState, useEffect } from "react";
import { twMerge as tm } from "tailwind-merge";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function TemplateCard({ meme, isSelected, markTemplate }) {
  const [imgLoaded, setImgLoaded] = useState(null);
  const placeholderImg = "/img/56k70.png";

  useEffect(() => {
    const img = new Image();
    img.src = meme.url;
    img.onload = () => setImgLoaded(meme.url);
  }, [meme.url]);

  const cardClasses =
    "bg-clip-box relative grid h-full w-full max-w-[28rem] cursor-pointer items-end justify-center overflow-hidden !rounded text-center";

  return (
    <Card
      shadow={false}
      className={tm(cardClasses, isSelected && "border-4 border-gray-100")}
      onClick={() => markTemplate(meme.id)}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className={tm(
          "absolute m-0 h-full w-full rounded-none bg-cover bg-center",
          !imgLoaded && "bg-auto bg-no-repeat",
        )}
        style={{ backgroundImage: `url('${imgLoaded || placeholderImg}')` }}
      >
        <div
          className={tm(
            "to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50",
            !imgLoaded && "from-pink-200/80 via-black/20",
          )}
        />
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
