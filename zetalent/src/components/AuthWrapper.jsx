import React, { useState } from 'react'
import {MdFacebook} from 'react-icons/md'
import {FcGoogle} from 'react-icons/fc'
import { useStateProvider } from '@/context/StateContext'
import { reducerCases } from '@/context/constants'
import axios from 'axios'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { useCookies } from 'react-cookie'

const AuthWrapper = ({type}) => {
  const[cookies, setCookies] = useCookies()
  const[{showLoginModule, showSignupModule}, dispatch] = useStateProvider(); 
  const[values, setValues] = useState({email: "", password:""})

  const handleChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  };

  const handleClick = async(req, res) => {
    try{
      const {email, password} = values;
      if(email && password){
        const {
          data: {user, jwt}} = await axios.post(
          type === "login" ? 
          LOGIN_ROUTE : SIGNUP_ROUTE,
          {email, password},
          {withCredentials: true}
        );
        setCookies("jwt", jwt);
        dispatch({type: reducerCases.CLOSE_AUTH_MODULE })
        if(user){
          dispatch({type: reducerCases.SET_USER, userInfo: user});
          window.location.reload();
        }
      }
    }
    catch(err){
        console.log(err)
    }
  }

  return (
    <div className='fixed top-0 z-[100] rounded-2xl text-[#454545]'>
      <div className='h-[100vh] w-[100vw] backdrop-blur-xs fixed top-0' id='blur-div'>
        <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center'>
        <div className='fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center' id='auth-modal'>
          <div className='flex flex-col justify-center items-center p-8 gap-7'> 
            <h3 className='text-2xl font-semibold text-slate-700'>{type === "login" ? "Login to Zetalent" : "Signup to Zetalent"}</h3>
            <div className='flex flex-col gap-5'>
              <button className='text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative cursor-pointer'>
                <MdFacebook className='absolute left-4 text-2xl'/>
                Continue with Facebook
              </button>
              <button className='border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative cursor-pointer'>
                <FcGoogle className='absolute left-4 text-xl'/>
                Continue with Google
              </button>
            </div>
            <div className='relative w-full text-center'>
              <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                <span className='bg-white relative z-10 px-2'>
                  OR
                </span>
              </span>
            </div>
            <div className='flex flex-col gap-5'>
              <input 
              type="email" 
              name="email" 
              placeholder='Email' 
              className='border border-slate-300 p-3 w-80'
              value={values.email}
              onChange={handleChange}
              />
              <input type="password" 
              name="password" 
              placeholder='Password' 
              className='border border-slate-300 p-3 w-80' value={values.password} 
              onChange={handleChange}/>
              <button className='bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md p-3 w-80 cursor-pointer' onClick={handleClick}>Continue with Email</button>
            </div>
          </div>
          <div className="py-5 w-full flex items-center justify-center border-t border-r-slate-400">
            <span className='text-sm text-slate-700'>
              { type === "login" ? 
              (<>
              Not a user?{""}
              <span className='text-[#1DBF73] cursor-pointer' onClick={() => {
                dispatch({type:reducerCases.TOGGLE_LOGIN_MODULE, showLoginModule:false});
                dispatch({
                  type:reducerCases.TOGGLE_SIGNUP_MODULE,
                  showSignupModule:true
                })
                }}> Sign Up</span> 
              </>) : 
              (<>
              Already an user? {""}
              <span className='text-[#1DBF73] cursor-pointer' onClick={() => {
              dispatch({
                type:reducerCases.TOGGLE_SIGNUP_MODULE, showSignupModule: false});
              dispatch({
                type:reducerCases.TOGGLE_LOGIN_MODULE, showLoginModule: true
                });}}> Login Now</span>
              </>)
              }
              
            </span>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default AuthWrapper