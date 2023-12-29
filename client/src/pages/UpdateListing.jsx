import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        sport: '',
        description: '',
        venue: '',
        categoryMS: false,
        categoryWS: false,
        categoryMD: false,
        categoryWD: false,
        categoryXD: false,
        startDate: null,
        endDate: null,
        lastRegDate: null,
        regFee: 250,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json();
            if (data.message === false) {
                console.log(data.message);
                return;
            }
            setFormData(data);
        }
        fetchListing();
    }, []);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, 
                    imageUrls: formData.imageUrls.concat(urls) });
                    setImageUploadError(false);
                    setUploading(false);
            }).catch((err) => {
                setImageUploadError('Image upload failed (2mb max per image)');
                setUploading(false);
            });
        } else {
            setImageUploadError('You can only upload maximum 3 images for a tournament');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            )
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === 'categoryMS' || e.target.id === 'categoryWS' || e.target.id === 'categoryMD' || e.target.id === 'categoryWD' || e.target.id === 'categoryXD') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea' || 
            e.target.type === 'date'
          ) {
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError('You must atleast upload one image')
            setLoading(true);
            setError(false);
            const res = await fetch (`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Update a Tournament</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' 
                className='border p-3 rounded-lg' 
                id='name' maxLength='80' minLength='10' required 
                onChange={handleChange}
                value={formData.name} />

                <input type='text' placeholder='Sport' 
                className='border p-3 rounded-lg' 
                id='sport' maxLength='20' required
                onChange={handleChange}
                value={formData.sport} />

                <input type='text' placeholder='Venue' 
                className='border p-3 rounded-lg' 
                id='venue' required
                onChange={handleChange}
                value={formData.venue} />

                <textarea type='text' placeholder='Description' 
                className='border p-3 rounded-lg' 
                id='description' required
                onChange={handleChange}
                value={formData.description} />
                
                <h3 className='text-2xl font-medium'>Categories</h3>
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='categoryMS' className='w-5' 
                            onChange={handleChange} checked={formData.categoryMS} />
                        <span>Mens Singles</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='categoryWS' className='w-5' 
                            onChange={handleChange} checked={formData.categoryWS} />
                        <span>Womens Singles</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='categoryMD' className='w-5' 
                            onChange={handleChange} checked={formData.categoryMD} />
                        <span>Mens Doubles</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='categoryWD' className='w-5' 
                            onChange={handleChange} checked={formData.categoryWD} />
                        <span>Womens Doubles</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='categoryXD' className='w-5' 
                            onChange={handleChange} checked={formData.categoryXD} />
                        <span>Mix Doubles</span>
                    </div>
                </div>

                <div className='flex flex-wrap gap-6'>
                    <div className='gap-2'>
                        <p className='text-2xl font-medium mt-3 mb-3'>Start Date</p>
                        <input className='p-2 border-gray-500 rounded-lg' type='date' id='startDate' required onChange={handleChange} />
                    </div>

                    <div className='gap-2'>
                        <p className='text-2xl font-medium mt-3 mb-3'>End Date</p>
                        <input className='p-2 border-gray-500 rounded-lg' type='date' id='endDate' required onChange={handleChange} />
                    </div>

                    <div className='gap-2'>
                        <p className='text-2xl font-medium mt-3 mb-3'>Last Date for Registration</p>
                        <input className='p-2 border-gray-500 rounded-lg' type='date' id='lastRegDate' required onChange={handleChange} />
                    </div>              
                </div>

                <div className='gap-2'>
                    <p className='text-2xl font-medium mt-3 mb-3'>Registration Fees</p>
                    <input className='p-2 border-gray-500 rounded-lg' type='number' id='regFee'placeholder='₹' min='250' max='2000' required onChange={handleChange} value={formData.regFee}/>
                </div>
            </div>

            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 3)</span>
                </p>

                <div className='flex gap-4'>
                    <input onChange={(e) => setFiles(e.target.files)} className='p-3 border-black bg-gray-300 rounded w-full'type='file' id='images' accept='image/*' multiple />
                    <button 
                        onClick={handleImageSubmit} 
                        type='button' 
                        disabled={uploading}
                        className='p-3 text-white bg-blue-600 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                        {uploading ? 'Uploading... ' : 'Upload'}
                    </button>
                </div>
                <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-600 font-medium rounded-lg uppercase hover:opacity-75'
                >
                  Remove
                </button>
              </div>
            ))}
                <button disabled={loading || uploading} className='p-3 bg-emerald-600 font-medium text-black rounded-lg uppercase opacity-95 disabled:opacity-80'>
                    {loading ? 'Updating...' : 'Update tournament'}
                </button>
                {error && <p className='text-red-600 text-sm'>{error}</p>}
                
            </div>
            
        </form>
    </main>
  )
}
