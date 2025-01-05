import {createSlice} from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [] ; // agar local storage mai cart ke ander kuch nhi hoga toh empty rhaega nhi toh wo product dikhega jo local storage mai cart mai jo local storage mai hai, toh abb chahe refresh bhi karlo lekin cart item 0 nhi hoga jab tak wo local storage se delete na ho 

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{

        addToCart(state,action){
            state.push(action.payload);
        },
        deleteFromCart(state,action){
            return state.filter(item => item.id !=  action.payload.id);
        }

        

    }  

})

export const { addToCart , deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;