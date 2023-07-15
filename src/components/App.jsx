import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import getData from 'components/getData';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './ImageGallery/ImageGallery.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    loadImages(searchQuery, 1);
  }, [searchQuery]);

  const loadMoreImages = async () => {
    if (data.length >= totalHits) {
      return;
    }

    await loadImages(searchQuery, page + 1);
  };

  const loadImages = async (searchQuery, page) => {
    try {
      setLoading(true);
      setLoader(true);

      const dataImages = await getData(searchQuery, page);
      const { hits, totalHits } = dataImages;

      if (totalHits === 0) {
        toast.error('Oops! Enter a valid search query.');
        return;
      }

      if (page === 1) {
        setData([...hits]);
        setTotalHits(totalHits);
      } else {
        setData(prevData => [...prevData, ...hits]);
      }
      setPage(page);
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something went wrong. Try again later.');
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <div className={css.loaderWrapper}>
        {loader && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
      </div>
      <ImageGallery data={data} />
      {!loading && data.length > 0 && data.length < totalHits && (
        <Button onClick={loadMoreImages} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
