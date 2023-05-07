import { useContext, useEffect } from 'react';
// import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../context/user.context';


const AddToPlaylist = () => {
  // const [addPlaylistForm, setAddPlaylistForm] = useState(false);
  const { setCreatePlaylistFrom, setAddPlaylistForm, addPlaylistForm } =
    useContext(UserContext);
  const [listOfMovies, setListOfMovies] = useState();
  const { movieData } = useContext(UserContext);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [afterAddMessage, setAfterAddMessage] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const sessionToken = sessionStorage.getItem('token');
      fetch('http://localhost:3001/playlist-list', {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'text/plain',
          token: 'Bearer' + sessionToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setListOfMovies(data);
        });
    };

    getUsers();
  }, []);

  const fetchFunc = async () => {
    const sessionToken = sessionStorage.getItem('token');
    fetch('http://localhost:3001/playlist-list', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'text/plain',
        token: 'Bearer' + sessionToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListOfMovies(data);
      });
  };

  const xMessage = (message) => {
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };

  const addToPlaylistButton = (index) => {
    const sessionToken = sessionStorage.getItem('token');
    if (movieData.Response === 'False') {
      xMessage();
      setAfterAddMessage('Name cannot be empty.');
    } else {
      const sendData = {
        objectId: listOfMovies[index]._id,
        movieToAdd: movieData.Title,
      };
      if (sendData.movieToAdd === undefined) {
        xMessage();
        setAfterAddMessage('Please search a movie to add it to the playlist.');
      } else {
        fetch('http://localhost:3001/concat-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer' + sessionToken,
          },
          body: JSON.stringify(sendData),
        })
          .then((response) => response.json())
          .then((data) => {
            xMessage();
            setAfterAddMessage(data.message);
          });
      }
    }
  };

  const ATPL = () => {
    // add to playlist
    return (
      <div>
        <div className='flex flex-col justify-center p-5 mt-5 overflow-auto border rounded-md max-h-56 place-items-center'>
          <div className='h-52'>
            {listOfMovies && listOfMovies.length === 0 ? (
              <div className='text-center text-red-600'>
                No playlist available. Please create a new playlist.
              </div>
            ) : (
              listOfMovies.map((title, index) => {
                return (
                  <div
                    className='flex w-56 h-10 p-1 my-2 text-teal-900 border'
                    key={index}
                  >
                    <div className='flex items-center justify-start flex-1 ml-2'>
                      {title.title}
                    </div>
                    <button
                      className='right-0 flex-none px-2 text-white duration-150 bg-blue-600 border rounded-md hover:bg-blue-400'
                      onClick={() => addToPlaylistButton(index)}
                    >
                      +
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {isAlertVisible && (
          <div className='p-5 text-xl text-center text-green-500'>
            {afterAddMessage}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col place-items-center'>
      <button
        className='p-3 text-white duration-200 bg-blue-700 border rounded-md w-44 hover:bg-blue-400 hover:text-black'
        onClick={() => {
          setAddPlaylistForm(!addPlaylistForm);
          setCreatePlaylistFrom(false);
          fetchFunc();
        }}
      >
        Add To Playlist
      </button>
      {addPlaylistForm === true ? <ATPL /> : null}
    </div>
  );
};

export default AddToPlaylist;
