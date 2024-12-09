import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
      return <div className="text-center">Paste not found!</div>;
  }

  return (
      <div className='w-[600px]'>
          <div className='flex flex-row gap-8'>
              <input
                  className='flex-1 p-3'
                  type='text'
                  value={paste.title}
                  disabled
              />
          </div>
          <div>
              <textarea
                  className='bg-[#1a1a1a] w-[100%] rounded-lg mt-2 p-3 text-white'
                  value={paste.content}
                  disabled
                  rows={20}
              />
          </div>
      </div>
  );
};


export default ViewPaste;
