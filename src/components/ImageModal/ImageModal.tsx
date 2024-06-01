import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

type Props = {
  modal: boolean;
  onClose: () => void;
  url: string;
  alt: string;
};

const ImageModal: React.FC<Props> = ({ modal, onClose, url, alt }: Props) => {
  return (
    <div>
      <ReactModal
        isOpen={modal}
        contentLabel="Modal"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={onClose}
        overlayClassName={css.overlay}
        className={css.modal}
      >
        <img className={css.img} src={url} alt={alt} width={1080} />
      </ReactModal>
    </div>
  );
};
export default ImageModal;
