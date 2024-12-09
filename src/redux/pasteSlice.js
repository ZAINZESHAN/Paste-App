import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : [],
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            const titleExists = state.pastes.some(existingPaste => existingPaste.title === paste.title);

            if (titleExists) {
                toast.error("A paste with this title already exists!");
                return;
            }

            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste Created Successfully");
        },

        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);

            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste Updated");
            }
        },

        removeFromPastes: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success('Paste deleted');
            }
        },

        sharePaste: (state, action) => {
            const pasteId = action.payload; // Paste ID to share
            const baseUrl = window.location.origin; // Base URL of your app
            const shareableUrl = `${baseUrl}/pastes/${pasteId}`; // Construct the URL

            navigator.clipboard.writeText(shareableUrl); // Copy to clipboard
            toast.success('Shareable link copied to clipboard!');
        },


    },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPastes, sharePaste } = pasteSlice.actions;

export default pasteSlice.reducer;
