import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import jwt_decode from "jwt-decode";
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (credentialResponse) => {
        const decoded_response = jwt_decode(credentialResponse.credential);
        localStorage.setItem('user', JSON.stringify(decoded_response));
        const { given_name, sub, picture } = decoded_response;
        const doc = {
            _id: sub,
            _type: 'user',
            username: given_name,
            image: picture
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true })
        })
    };
    return (
        <div className='flex flex-col justify-start items-center h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width="130px" alt="logo" />
                    </div>
                    <div className='shadow-2xl'>
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
                            <GoogleLogin
                                onSuccess={responseGoogle}
                                onError={responseGoogle}
                                useOneTap
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login