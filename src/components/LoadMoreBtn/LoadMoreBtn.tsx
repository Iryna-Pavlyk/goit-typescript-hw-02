import css from "./LoadMoreBtn.module.css";

type Props = {
  onClik: () => void;
};

const LoadMoreBtn: React.FC<Props> = ({ onClik }: Props) => {
  return (
    <div className={css.wrapper}>
      <button className={css.btn} onClick={onClik}>
        Load More
      </button>
    </div>
  );
};
export default LoadMoreBtn;
