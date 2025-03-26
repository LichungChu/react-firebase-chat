import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../constants/chatStore";
import { auth, db } from "../../constants/firebase"
import { useUserStore } from "../../constants/userStore";
import "./detail.css"

const Detail = () => {
  const { user , isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const { currentUser } = useUserStore();
  
  const handleBlock = async () => {
    if(!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try{
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      });
      changeBlock();
    }catch(err){
      console.log(err);
    }

  };

  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar ||"./avatar.png" } alt="" />
        <h2>{user?.username}</h2>
        <p>XXXXXXXXXXXXXXXXXXXX</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy % help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img 
                  src="./bg_jupiter.png" 
                  alt=""
                />
                <span>bg_jupiter.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img 
                  src="./bg_jupiter.png" 
                  alt=""
                />
                <span>bg_jupiter.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {
            isCurrentUserBlocked 
              ? "You are blocked!"
              : isReceiverBlocked
              ? "User blocked"
              : "Block User"
          }
        </button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail