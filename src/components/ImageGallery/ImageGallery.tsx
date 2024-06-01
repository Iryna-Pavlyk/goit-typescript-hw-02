import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { APIresults } from "../../gallery-api";

type Props = {
  items: APIresults[];
  onOpen: (imgUrl: string, imgAlt: string) => void;
};

const ImageGallery: React.FC<Props> = ({ items, onOpen }: Props) => {
  return (
    <ul className={css.list}>
      {items.map((item) => {
        return (
          <li className={css.item} key={item.user.id}>
            <ImageCard item={item} onOpen={onOpen} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
