import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false
  },
  reducers: {
    setModalState(state) {
      state.open = !state.open;
    }
  }
});

export default modalSlice.reducer;
export const ModalActions = modalSlice.actions;
