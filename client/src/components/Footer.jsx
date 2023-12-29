import 'flowbite';
import logo from '../../public/images/logo.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
<footer class="bg-gray-900 shadow-md">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            <Link to=''>
                  <img src={logo} class="h-8 me-3" alt="Logo" />
            </Link>
            <p className='flex max-w-md pt-2 text-white'>Our product aims at eliminating all the challenges faced by the Organizers and the Participants.
        It's our mission to make recreational sports better for everyone.
        We will be happy to provide our services to all the Tournament Organizers and Sports Players.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <ul class="text-gray-300  font-medium">
                      <Link to='/'>
                        <li className='hover:underline mb-3 mt-5'>Home</li>
                      </Link>
                      <Link to='/search'>
                        <li className='hover:underline mb-3'>Tournaments</li>
                      </Link>
                      <Link to='/about'>
                        <li className='hover:underline mb-3'>About Us</li>
                      </Link>
                      <Link to='/disclaimer'>
                        <li className='hover:underline mb-3'>Disclaimer</li>
                      </Link>
                  </ul>
              </div>
              <div>
              <ul class="text-gray-300 font-medium">
                      <Link to='/sign-in'>
                        <li className='hover:underline mb-3 mt-5'>Login</li>
                      </Link>
                      <Link to='/sign-up'>
                        <li className='hover:underline mb-3'>Sign Up</li>
                      </Link>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 GameGrid™. All Rights Reserved.</span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
          <Link to='https://www.facebook.com/'>
            <FaFacebook className='text-emerald-500 hover:text-white text-2xl mr-2' />
          </Link>
          <Link to='https://www.instagram.com/'>
            <FaInstagram className='text-emerald-500 hover:text-white text-2xl mr-2' />
          </Link>
          <Link to='https://twitter.com/i/flow/login'>
            <FaTwitter className='text-emerald-500 hover:text-white text-2xl mr-2' />
          </Link>
          <Link to='https://in.linkedin.com/'>
            <FaLinkedin className='text-emerald-500 hover:text-white text-2xl mr-2' />
          </Link>
          <Link to='https://www.youtube.com/'>
            <FaYoutube className='text-emerald-500 hover:text-white text-2xl'/>
          </Link>
            
          </div>
      </div>
    </div>
</footer>

    );
}