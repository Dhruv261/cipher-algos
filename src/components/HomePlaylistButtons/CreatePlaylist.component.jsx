import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import CPLF from './PlayListForm.component';

const CreatePlaylist = () => {
  // const [createPlaylistForm, setCreatePlaylistFrom] = useState(false);
  const { createPlaylistForm, setCreatePlaylistFrom, setAddPlaylistForm } =
    useContext(UserContext);
  return (
    <div className='flex flex-col place-items-center'>
      <button
        className='p-3 text-white duration-200 bg-green-700 border rounded-md w-44 hover:bg-green-400 hover:text-black'
        onClick={() =>{
          setCreatePlaylistFrom(!createPlaylistForm)
          setAddPlaylistForm(false);
        }
        }
      >
        Create New Playlist
      </button>
      {createPlaylistForm === true ? <CPLF /> : null}
    </div>
  );
};

export default CreatePlaylist;
