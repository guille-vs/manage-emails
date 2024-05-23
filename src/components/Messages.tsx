import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { getUserMailFolders, getUserMessages, moveMailToFolder } from '../GraphService';
import { Message } from '../interfaces';
import { useMessageData } from '../store';
import { SpinLoader } from '../ui/SpinLoader';

export const Messages = () => {


  const { setFolders, selectedFolder } = useMessageData(state => state);

  const [messages, setMessages] = useState<Message[]>([]);
  const [moveData, setMoveData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const app = useAppContext();

  const onMoveEmail = async () => {

    if (!selectedFolder) return;

    setIsLoading(true);
    getUserMessages(app.authProvider!)
      .then(resp => {
        setMessages(resp.value);
        setMoveData(true);
      }).catch(err => {
        console.error(err);
        setIsLoading(false)
      });

  }


  const moveMessages = async () => {
    for (let i = 0; i < messages.length; i++) {

      await moveMailToFolder(app.authProvider!, messages[i].id, selectedFolder!.id);
    }

    getUserMailFolders(app.authProvider!)
      .then(resp => setFolders(resp.value))
      .catch(err =>console.error(err))
      .finally(() => setIsLoading(false));
  }


  useEffect(() => {
    if (!moveData) return;

    moveMessages();

    setMoveData(false);
  }, [moveData])


  return (
    <div className="py-3">
      <button
        className="bg-blue-500 p-2 rounded-md text-white flex justify-center items-center min-w-[100px]"
        onClick={onMoveEmail}
      >
        {
          (isLoading)
            ? <SpinLoader />
            : `Mover correros a ${selectedFolder?.displayName}`
        }
      </button>
    </div>
  )
}
