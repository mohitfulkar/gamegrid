import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FcNext } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";  
import { FaRegCalendarAlt } from "react-icons/fa";  
import { FaClipboardCheck } from "react-icons/fa";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
    const [contact, setContact] = useState(false);
    const {currentUser} = useSelector((state) => state.user);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
            
        };
        fetchListing();
    }, [params.listingId]);

  return (
    <main>
        {loading && 
            <p className='text-center font-semibold my-7 text-2xl'>Loading...</p>}
        
        {error && 
            <p className='text-center font-semibold my-7 text-2xl'>Something went wrong</p>}

        {listing && !loading && !error && (
            <div className='bg-slate-200'>
                <Swiper navigation>
                    {listing.imageUrls.map((url) => (
                        <SwiperSlide key={url}>
                            <div 
                                className='h-[500px]' 
                                style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className='flex flex-col max-w-8xl mx-auto p-3 my-7 gap-4 bg-emerald-600'>
                    <p className='text-4xl font-semibold text-center'>{listing.name}</p>
                    <p className='text-2xl font-medium text-center mt-1'>{listing.sport}</p>
                </div>
                < div className='pl-8 mt-5'>

                    <div className='flex p-5'>
                        <FaLocationDot size={'30px'} style={{color: '#02b4fa'}}/>
                        <h1 className='font-bold text-lg mt-2 ml-2'>Venue:</h1> 
                        <p className='mt-2.5 ml-3 font-medium'>{listing.venue}</p>
                    </div>
                    
                    <div className='flex p-5'>
                        <FaRegCalendarAlt size={'30px'} style={{color: '#02b4fa'}}/>
                        <h1 className='font-bold text-lg mt-1 ml-2'>Duration:</h1>
                    </div>
                    <ul className='flex p-2'>
                        <li className='ml-12'><h1 className='font-bold'>From: </h1> <p className='font-medium'>{listing.startDate.split('T')[0]}</p></li>
                        <li className='ml-5'><h1 className='font-bold'>To: </h1> <p className='font-medium'>{listing.endDate.split('T')[0]}</p></li>
                    </ul>
                        
                    <div className='flex p-5'>
                        <FaClipboardCheck size={'30px'} style={{color: '#02b4fa'}}/>
                        <h1 className='font-bold text-lg mt-1 ml-2'>Registration Fees:</h1> 
                        <p className='mt-2 ml-3 font-medium'>₹{listing.regFee}</p>
                    </div>

                    <div className='p-5 flex'>
                    <MdCategory size={'30px'} style={{color: '#02b4fa'}}/>
                        <h1 className='font-bold flex text-lg mt-1 ml-2'>Categories:</h1>
                    </div>
                    <div className='pl-5'>
                        <ul>
                            <li className='flex font-medium ml-8'><FcNext />{listing.categoryMS === true ? 'Mens Singles' : ''}</li>
                            <li className='flex font-medium ml-8'><FcNext />{listing.categoryWS === true ? 'Womens Singles' : ''}</li>
                            <li className='flex font-medium ml-8'><FcNext />{listing.categoryMD === true ? 'Mens Doubles' : ''}</li>
                            <li className='flex font-medium ml-8'><FcNext />{listing.categoryWD === true ? 'Womens Doubles' : ''}</li>
                            <li className='flex font-medium ml-8'><FcNext />{listing.categoryXD === true ? 'Mix Doubles' : ''}</li>
                        </ul>
                    </div>

                    <div className='flex p-5'>
                        <FaRegCalendarXmark size={'30px'} style={{color: '#02b4fa'}}/>
                        <h1 className='font-bold text-lg mt-1 ml-2'>Last Date for Registration:</h1> 
                    </div>
                    <p className='pl-2 mt-2 ml-12 font-medium'>{listing.lastRegDate.split('T')[0]}</p>

                    <div className='flex p-5'>
                        <IoInformationCircle size={'30px'} style={{color: '#02b4fa'}}/>
                        <h1 className='font-bold text-lg mt-1 ml-2'>Description:</h1>
                    </div>
                    <p className='pl-2 ml-12 font-medium mr-12 mb-5'>{listing.description}</p>

                    
                    <div className='flex flex-col items-center'>
                    {currentUser && listing.userRef !== currentUser._id && !contact && (
                        <button 
                            onClick={() => setContact(true)} 
                            className='bg-emerald-500 rounded-lg uppercase hover:opacity-95 p-3 self-center font-medium mb-5'>
                                Contact Organizer
                        </button>
                    )}
                    {contact && <Contact listing={listing}/>}
                    </div>
                </div>

            </div>
        )}
    </main>
  )
}
