import React, { useContext } from 'react';
import { AuthContext } from '../firebase/AuthProvider';

const Profile = () => {
    const {user} = useContext(AuthContext)
console.log(user);
    return (
        <div>
            {
                 user?.displayName ?
                  <div className='md:flex justify-between'>
                    <h4 className='text-3xl h-screen flex w-full justify-center text-center items-center font-bold '>
                        
                    {user?.displayName}
                    </h4>
                    <img src={user?.photoURL} alt="" />
                 </div> : 'Please Login First' 
            }
        </div>
    );
};

export default Profile;