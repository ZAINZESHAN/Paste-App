import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes, sharePaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    const handleShare = (pasteId) => {
        dispatch(sharePaste(pasteId));
    };

    return (
        <div className='flex flex-col w-[600px]'>
            <input
                className='p-3 flex-1'
                type="search"
                placeholder='Search here..'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='flex flex-col mt-3'>
                {filteredData.length > 0 && filteredData.map((paste) => (
                    <div key={paste._id} className='border border-black flex flex-col text-center p-2 rounded-lg mb-2'>
                        <div>{paste.title}</div>
                        <div>{paste.content}</div>
                        <div className='flex flex-row justify-around'>
                            <button className='px-2 py-1'>
                                <NavLink to={`/?pasteId=${paste._id}`}>Edit</NavLink>
                            </button>
                            <button onClick={() => handleDelete(paste._id)} className='px-2 py-1'>Delete</button>
                            <button onClick={() => handleShare(paste._id)} className='px-2 py-1'>Share</button>
                            <button onClick={() => {
                                navigator.clipboard.writeText(paste.content);
                                toast.success("Copied!");
                            }} className='px-2 py-1'>Copy</button>
                            <button className='px-2 py-1'>
                                <NavLink to={`/pastes/${paste._id}`}>View</NavLink>
                            </button>
                        </div>
                        <div>{paste.createdAt}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Paste;
