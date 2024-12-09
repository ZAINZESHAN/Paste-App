import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            // updating
            dispatch(updateToPastes(paste));
        } else {
            // creating
            dispatch(addToPastes(paste));
        }

        // After Updation or Creation 
        setValue('');
        setTitle('');
        setSearchParams({});
    }

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
        <div className='w-[600px]'>
            <div className='flex flex-row gap-8'>
                <input
                    className='flex-1 p-3'
                    type='text'
                    placeholder='Enter title here..'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className='w-[27%]' onClick={createPaste}>
                    {pasteId ? "Update Paste" : "Create My Paste"}
                </button>
            </div>
            <div>
                <textarea
                    className='bg-[#1a1a1a] w-[100%] rounded-lg mt-2 p-3 text-white'
                    value={value}
                    placeholder='Enter Content here..'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    );
};

export default Home;
