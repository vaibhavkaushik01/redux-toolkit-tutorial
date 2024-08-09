import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
const url = "https://www.course-api.com/react-useReducer-cart-project";

export const getElementsfromApi = createAsyncThunk("cart/getElements",()=>{
    return fetch(url).then(
        (resp)=>resp.json()
    ).catch(
        (err)=>console.log(err)
    )
})

const initialState = {
    cartItems : [],
    amount : 0,
    total : 0,
    isLoading : true,
}


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        emptyCart : (state)=>{
            state.cartItems = [];
        },
        removeItem : (state,action)=>{
            const id = action.payload;
            console.log(action.payload);
            state.cartItems = state.cartItems.filter((item)=>item.id!==id);
        },
        increase : (state,action) =>{
            const id = action.payload;
            const item_to_update = state.cartItems.find((item)=>{
                return item.id === id;
            });
            item_to_update.amount++;
        },
        decrease : (state,{payload})=>{
            const id = payload;
            const item_to_update = state.cartItems.find((item)=>{
                return item.id === id;
            });
            item_to_update.amount--;
        },
        calculateTotal : (state)=>{
            let amount = 0;
            let total = 0
            state.cartItems.forEach((item)=>{
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(
            getElementsfromApi.pending,(state)=>{
                state.isLoading = true;
            }
        ).addCase(
            getElementsfromApi.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.cartItems = action.payload;
            }
        ).addCase(
            getElementsfromApi.rejected,(state)=>{
                state.isLoading = false;
            }
        )
    }
});
console.log(cartSlice);

export const {emptyCart,removeItem,increase,decrease,calculateTotal} = cartSlice.actions;

export default cartSlice.reducer;