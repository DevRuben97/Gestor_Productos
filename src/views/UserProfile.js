import React, { useEffect, useContext, useState } from 'react';
import {GetUserInfo} from '../http/Auth';
import UserInfo from '../Context/UserContext';
import Avatar from 'react-avatar';

export default function UserProfile(props){

    const {User} = useContext(UserInfo);
    const [Profile, SetProfile]= useState({});

    useEffect(()=>{
        async function GetProfile(){
            
            const {data}= await GetUserInfo(User.Id);
            SetProfile(data.Data);
        }
        GetProfile();
    },[])
    return (
        <div className="container">
            <h2 className="text-center"><i class="fas fa-id-card"></i> Perfil del Usuario</h2>

           <div className="card">
               <div className="card-body">
                   <div style={{justifyContent: 'center', display: 'flex'}}>
                        <Avatar name= {Profile.FullName} round='10px' size= '80px'/>
                   </div>
                   <div>
                        <h2 className="text-center">{Profile.FullName}</h2>
                   </div>
                   <br />
                   <div style={{justifyContent: 'center', display: 'flex'}}>
                        <div>
                        <label><strong>Correo: </strong> {Profile.Email}</label>
                        <br/>
                        <label><strong>Identificación: </strong> {Profile.Identification}</label>
                        <br/>
                        <label><strong>Telefono: </strong> {Profile.Phone}</label>
                        </div>
                   </div>
               </div>
           </div>
        </div>
    )
}