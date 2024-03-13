import { userFormInterface } from '@/types/form.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface State {
    isUserCompleted: boolean,
    userData: userFormInterface
}

const initialState: State = {
    isUserCompleted: false,
    userData: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset_user: () => initialState,
        setUserData: (state, action: PayloadAction<userFormInterface>) => {
            state.isUserCompleted = true;
            state.userData = action.payload;
        }

    }
})


export const { reset_user, setUserData } = userSlice.actions
export default userSlice.reducer