import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface State {
    productsData: Product[];
}

const initialState: State = {
    productsData: [],
};

export const userSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset_product: () => initialState,
        addProduct: (state: State, action: PayloadAction<Product>) => {
            state.productsData.unshift(action.payload);
        },
    },
});

export const { reset_product, addProduct } = userSlice.actions;
export default userSlice.reducer
