import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import img1 from '../../public/images/5.png';
import img2 from '../../public/images/4.png';
import img3 from '../../public/images/6.png';
import img4 from '../../public/images/1.png';
import img5 from '../../public/images/2.png';
import img6 from '../../public/images/3.png';
import img7 from '../../public/images/7.png';



export default function Home() {
  const [recentListings, setRecentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(recentListings);

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?sort=createdAt&limit=6');
        const data = await res.json();
        setRecentListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecentListings();
  }, [])

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='font-bold text-3xl lg:text-6xl'>Life Is A <span className='text-emerald-500'>Sport</span>
        <br />Make It Count!</h1>

        <div className='text-slate-700 text-xs sm:text-sm'>
          If you're an Organizer, organize your tournament with us!
          <br />
          If you're a Player, participate in the upcoming tournaments!
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-600 font-bold hover:underline'>
          Let's Goo...
        </Link>
      </div>


      {/* swiper */}
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper bg-cover max-w-fit"
      >
        <SwiperSlide><img src={img1} /></SwiperSlide>
        <SwiperSlide><img src={img2} /></SwiperSlide>
        <SwiperSlide><img src={img3} /></SwiperSlide>
        <SwiperSlide><img src={img4} /></SwiperSlide>
        <SwiperSlide><img src={img5} /></SwiperSlide>
        <SwiperSlide><img src={img6} /></SwiperSlide>
        <SwiperSlide><img src={img7} /></SwiperSlide>
      </Swiper>




      {/* listing */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        { recentListings && recentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold'>Recent tournaments</h2>
              <Link className='text-sm font-medium text-emerald-600 hover:underline' to={'/search?sort=createdAt'}>Show more tournaments</Link>
            </div>

            <div className='flex flex-wrap gap-4'>{
               recentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
               ))
            }
            </div>
          </div>

        )}
      </div>

    </div>
  )
}
