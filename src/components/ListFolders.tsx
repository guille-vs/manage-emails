import { useEffect } from "react"
import { getUserMailFolders } from "../GraphService"
import { useAppContext } from "../context/AppContext";
import { FaRegFolder } from "react-icons/fa";
import { useMessageData } from "../store";
export const ListFolders = () => {

    const { folders, setFolders, setSelectedFolder } = useMessageData(state => state);

    const app = useAppContext();
    useEffect(() => {

        getUserMailFolders(app.authProvider!)
            .then(resp => setFolders(resp.value))
    }, [])

    return (
        <div className="flex flex-col items-start gap-2">
            {
                folders.map(folder => (
                    <div
                        className="hover:bg-gray-200 basis-10 rounded-md flex gap-4 px-4 py-2 cursor-pointer transition-all"
                        key={folder.id}
                        onClick={() => setSelectedFolder(folder)}
                    >
                        <FaRegFolder size={20} />
                        <p>{folder.displayName}</p>
                        {
                            folder.totalItemCount != 0 && <strong>{folder.totalItemCount}</strong>
                        }
                    </div>
                ))
            }
        </div>
    )
}
