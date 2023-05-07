import { useContext, useState } from 'react';
import { UserContext } from '../../context/user.context';

const CPLF = () => {
  const [playlistName, setPlaylistName] = useState();
  // const [publicPlaylist, setPublicPlaylist] = useState(false);
  const { sessionToken } = useContext(UserContext);
  const [response, setResponse] = useState();
  const [isAlertVisible1, setIsAlertVisible1] = useState(false);
  //create play list from

  const rendData = {
    title: playlistName,
    // openList: publicPlaylist,
  };

  const createPlaylist = async (e) => {
    e.preventDefault();
    if (rendData.title === undefined) {
      setIsAlertVisible1(true);
      zmessage();
    } else {
      await fetch('http://localhost:3001/create-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: 'Bearer' + sessionToken,
        },
        body: JSON.stringify(rendData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Playlist created') {
            setIsAlertVisible1(true);
            ymessage();
          }
        });
    }
  };

  const zmessage = () => {
    setResponse('Please give your playlist a name.');

    setTimeout(() => {
      setIsAlertVisible1(false);
    }, 2000);
  };

  const ymessage = () => {
    setResponse('Playlist Created!');

    setTimeout(() => {
      setIsAlertVisible1(false);
    }, 2000);
  };

  return (
    <div>
      <div className='flex flex-col p-5 m-5 border rounded-md place-items-center'>
        <span>Name the playlist</span>
        <input
          type='text'
          className='w-auto p-1 my-2 text-teal-900 border outline-none'
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        {/* <span>
          Public Playlist
          <input
            type='checkbox'
            name=''
            id=''
            className='mx-5'
            onChange={(e) => setPublicPlaylist(e.target.checked)}
          />
        </span> */}
        <button
          className='w-24 mt-3 duration-150 border rounded-md bg-slate-400 hover:bg-slate-200 h-9'
          onClick={createPlaylist}
        >
          Submit
        </button>
      </div>
      {isAlertVisible1 && (
        <div className='p-5 text-xl text-center text-green-500 '>
          {response}
        </div>
      )}
    </div>
  );
};

export default CPLF;
