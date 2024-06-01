import { useState, useEffect } from "react";
import { APIresults, fetchPhotos } from "../../gallery-api";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

const App: React.FC = () => {
  const [images, setImages] = useState<APIresults[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const handleOpenModal = (imgUrl: string, imgAlt: string): void => {
    setShowModal(true);
    setModalUrl(imgUrl);
    setModalAlt(imgAlt);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getImages(): Promise<void> {
      try {
        setError(false);
        setIsLoading(true);
        const data: APIresults[] = await fetchPhotos(query, page);
        if (data.length > 0) {
          setShowBtn(true);
          setImages((prevImages) => {
            return [...prevImages, ...data];
          });
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <div className={css.container}>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery items={images} onOpen={handleOpenModal} />
        )}
        {images.length > 0 && !isLoading && showBtn && (
          <LoadMoreBtn onClik={handleLoadMore} />
        )}
        {images.length > 0 && (
          <ImageModal
            modal={showModal}
            onClose={handleCloseModal}
            url={modalUrl}
            alt={modalAlt}
          />
        )}
      </div>
    </>
  );
};

export default App;
