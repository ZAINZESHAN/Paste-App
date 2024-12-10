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
                toast.error("A paste with this title already exists!", { position: "top-right" });
                return;
            }

            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste Created Successfully", { position: "top-right" });
        },

        updateToPastes: (state, action) => {
            const paste = action.payload
            const index = state.pastes.findIndex((item) => item._id === paste._id)

            if (index >= 0) {
                // If the course is found in the Pastes, update it
                state.pastes[index] = paste
                // Update to localstorage
                localStorage.setItem("pastes", JSON.stringify(state.pastes))
                // show toast
                toast.success("Paste updated", { position: "top-right" })
            }
        },

        removeFromPastes: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success('Paste deleted', { position: "top-right" });
            }
        },

        sharePaste: (state, action) => {
            const pasteId = action.payload; // Paste ID to share
            const baseUrl = window.location.origin; // Base URL of your app
            const shareableUrl = `${baseUrl}/pastes/${pasteId}`; // Construct the URL

            navigator.clipboard.writeText(shareableUrl); // Copy to clipboard
            toast.success('Shareable link copied to clipboard!', { position: "top-right" });
        },

        resetPaste: (state) => {
            state.pastes = []
            // Update to localstorage
            localStorage.removeItem("pastes")
        },

    },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPastes, sharePaste, resetPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
