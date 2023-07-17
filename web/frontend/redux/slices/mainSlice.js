import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMutated: false,
    deliveryDate: {},
    storePickup: {},
};

export const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        isBeingMutated: (state) => {
            state.isMutated = true;
        },

        resetMutated: (state) => {
            state.isMutated = false;
        },

        setDeliveryDate: (state, action) => {
            state.deliveryDate = action.payload;
        },

        setStorePickup: (state, action) => {
            console.log(action.payload);
            state.storePickup = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { isBeingMutated, resetMutated, setDeliveryDate, setStorePickup } = mainSlice.actions;

export default mainSlice.reducer;
