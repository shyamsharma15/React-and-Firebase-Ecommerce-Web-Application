import { Link } from 'react-router-dom'
import {useState,useContext} from 'react';
import myContext from '../../context/data/MyContext';
import {toast} from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth,fireDB} from '../../firebase/FirebaseConfig';
import {collection , addDoc , Timestamp} from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const context = useContext(myContext);

    const{loading , setLoading} = context;

    const signup = async () => {
        //console.log(name,email,password);
        setLoading(true);
        if(name === "" || email === "" || password === ""){
            return toast.error("All fields are required");
        }

        try{
            const users = await createUserWithEmailAndPassword(auth,email,password); // yea firebase ka method  hai isme issi sequence mai yea dete hai yea firebase mai auth mai store kar deta hai yea user ki information 
            //console.log(users);
            // abb firestore mai iss data ko bhejne ke liye hum yea object bnainge

            const user = {
                name:name,
                uid:users.user.uid,
                email:users.user.email,
                time:Timestamp.now(), // user ko order wise time wise dikhayega yea method
            }

            const userRef = collection(fireDB,'users'); // yea hum users naam ka collection bna rhae hai firestore mai database ka naam hai fireDB
            await addDoc(userRef,user ); // mujhe iss user ke ander jo data hai wo add karna hai firestore mai 
            toast.success("Signup Successfully");
            setName(""); // signup hone ke baad form ki fields khalli kar dinge
            setEmail("");
            setPassword("");
            setLoading(false);

        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }


   

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
         
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup