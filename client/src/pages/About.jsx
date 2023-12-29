import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import logo2 from '../../public/images/logo2.png';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Us</h1>
      
      <p className='mb-4 text-slate-700'>We're software developers with a passion for sports!</p>
      <p className='mb-4 text-slate-700'>
      Our mission is to make a tournament as easy and fun as possible, for both the organizers and players.
      </p>
      <p className='mb-4 text-slate-700'>Our product aims at eliminating all the challenges faced by the Organizers and the Participants.
        It's our mission to make recreational sports better for everyone.
        We will be happy to provide our services to all the Tournament Organizers and Sports Players.</p>

        <div className='flex items-center justify-center m-10'>
          <img src={logo2} className='h-16 w-38'/>
        </div>

        <div className=''>
          <h1 className='text-3xl font-bold mb-4 text-slate-800'>Contact Us</h1>

          <h2 className='text-2xl font-semibold flex items-center gap-2'><MdEmail className="h-7 w-7 text-emerald-600" />Email: </h2>
          <p className='font-medium m-2'>gamegridconnect@play</p>

          <h2 className='text-2xl font-semibold flex items-center gap-2'><FaPhoneSquareAlt className="h-7 w-7 text-emerald-600" />Phone: </h2>
          <p className='font-medium m-2'>+91 6969696969</p>

          <h2 className='text-2xl font-semibold flex items-center gap-2'><FaMapLocationDot className="h-7 w-7 text-emerald-600" />Address: </h2>
          <p className='font-medium m-2'>Palladion Square, Level 3, near Comfort Zone, Kothrud, Pune, Maharashtra 411069, India</p>
        </div>

        <div className='bg-slate-900 mt-10 rounded-lg p-5'>
          <h1 className='text-2xl font-bold text-white'>“<span className='text-emerald-500'>Sport</span> has the power to change the <span className='text-emerald-500'>world</span>...</h1>
          <h1 className='text-lg font-semibold text-white'>It has the power to inspire. It has the power to unite people in a way that little else does. 
              It speaks to youth in a language they understand. Sport can create hope where once there was only despair. 
              It is more powerful than government in breaking down racial barriers.” – Nelson Mandela</h1>
        </div>
        
    </div>
    
  )
}
