import React, { useState } from 'react';
import HomeButton from '../components/HomeButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [format, setFormat] = useState('');
  const [pages, setPages] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      format,
      pages,
      status,
      notes,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book added successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Please fill out all required fields', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <HomeButton />
      <h1 className='text-3xl text-center mb-6'>Add Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] px-4 mx-auto'>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>
            Title
            <span className='italic text-sm'> (required)</span>
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>
            Author
            <span className='italic text-sm'> (required)</span></label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>
            Format
            <span className='italic text-sm'> (required)</span>
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option disabled={true} value=''>Choose an option</option>
            <option value='Printed'>Printed</option>
            <option value='Ebook'>Ebook</option>
            <option value='Audio'>Audio</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>
            Pages
            <span className='italic text-sm'> (required)</span>
          </label>
          <input
            type='number'
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>
            Status
            <span className='italic text-sm'> (required)</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option disabled={true} value=''>Choose an option</option>
            <option value='Unread'>Unread</option>
            <option value='Reading'>Reading</option>
            <option value='Finished'>Finished</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-lg mr-4 text-gray-500'>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-40'
          />
        </div>
        <button className='p-2 m-6 w-full bg-sky-300 rounded-lg text-lg self-center' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default AddBook