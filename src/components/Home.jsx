import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes, resetPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { IoCopyOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const navigate = useNavigate();

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Updating
      dispatch(updateToPastes(paste));

    } else {
      // Creating
      dispatch(addToPastes(paste));
    }

    // After Updation or Creation 
    setValue('');
    setTitle('');
    setSearchParams({});
  }

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  return (
    <div className="space-y-4 my-2 max-w-[1200px] mx-auto px-4 sm:px-2 md:px-8 lg:px-12">
      <div className="flex flex-row gap-4">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="w-[20%] sm:w-[20%] lg:w-[15%] py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
          onClick={() => {
            if (!title || !value) {
              toast.error("Please fill out all field", { position: "top-right" })
            }
            else {
              createPaste()
            }
          }
          }
        >
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
        {pasteId && <button
          className="py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 px-4 focus:ring-blue-400 shadow-md"
          onClick={resetPaste}
        >
          Reset
        </button>}
      </div>
      <div className='border border-gray-300 rounded-t-lg flex justify-end'>
        <div className="w-full flex gap-x-[6px] pl-3 items-center select-none group">
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

          <div
            className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
          />

          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
        </div>
        <div className=''>
          <button
            className="py-2 px-4"
            onClick={() => {
              if (!value) {
                toast.error("Failed to copy text", { position: "top-right" })
              }
              else {
                navigator.clipboard.writeText(value)
                  .then(() => toast.success("Copied to Clipboard", { position: "top-right" }))
                  .catch(err => toast.error("Failed to copy text", { position: "top-right" }));
              }
            }}
          >
            <IoCopyOutline />
          </button>
        </div>
      </div>
      <div>
        <textarea
          className="w-full p-3 border-r border-b border-l -mt-4 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900"
          placeholder="Write Your Content Here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
