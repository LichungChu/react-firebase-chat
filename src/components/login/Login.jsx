import { toast } from "react-toastify";
import "./Login.css";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from '../../constants/firebase'
import { doc, setDoc } from "firebase/firestore"; 
import upload from "../../constants/upload";

  const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
  });

  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);

  const handleAvatar = (e) => {
    if(e.target.files[0]) {
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{

        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData); 
        await signInWithEmailAndPassword(auth, email, password);

    }catch(err){
        console.log(err);
        toast.error(err.message);
    }
    finally{
        setLoading(false);
    }
  }
  
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const {username, email, password} = Object.fromEntries(formData); 
    const imgUrl = await upload(avatar.file);

    try{

        const res = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, "users", res.user.uid), {
            username: username,
            email: email,
            id:  res.user.uid,
            avatar: imgUrl,
            blocked: [],
        });

        await setDoc(doc(db, "userchats", res.user.uid), {
            chats: [],
        });

        toast.success("Account created! You can login now!");

    }catch(err){
        console.log(err);
        toast.error(err.message);
    }
    finally{
        setLoading(false);
    }
    
    console.log(username);
  }

  return (
    <div className='login'>
        {!register && (
            <div className="item">
                <h2>Welcome Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password"/>
                    <button disabled={loading}>{loading}{loading ? "Loading" : "Sign in"}</button>
                </form>
                {/*<p className="continue-p">--Or continue with--</p>
                <div
                    style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                >
                    <img src="./google.png" width={"35%"} />
                </div>*/}
                <p className="continue-p">--Or Register New--</p>
                <img 
                    src= "./register.png" width={"15%"}
                    alt="" 
                    className="add" 
                    onClick={() => setRegister((prev) => !prev)}    
                />  
            </div>
        )}
        {/*<div className="separator"></div>*/}
        {register && (
            <div className="item">
                <h2>Create an Accont</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload an image
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar} />
                    <input type="text" placeholder="Username"  name="username"/>
                    <input type="text" placeholder="Email"  name="email"/>
                    <input type="password" placeholder="Password"  name="password"/>
                    <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
                </form>
                {/*<p className="continue-p">--Or continue with--</p>
                <div
                    style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                >
                    <img src="./google.png" width={"35%"} />
                </div>*/}
                <p className="continue-p">--Or Return Login--</p>
                    <img 
                        src= "./return.png" width={"10%"}
                        alt="" 
                        className="add" 
                        onClick={() => setRegister((prev) => !prev)}    
                />  
            </div>
        )}
    </div>
  )
}

export default Login