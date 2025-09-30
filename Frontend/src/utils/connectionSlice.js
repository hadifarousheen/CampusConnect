import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "Connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections:(state,action)=>{
      const newState=state.filter(item=>item._id.toString()!==action.payload.toString())
      return newState;
    }
  },
});

export const { addConnections,removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
