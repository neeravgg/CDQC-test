import { familyFormInterface } from '@/types/form.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface State {
    familyData: familyFormInterface[]
}

const initialState: State = {
    familyData: []
}

export const familySlice = createSlice({
    name: 'family',
    initialState,
    reducers: {
        reset_family: () => initialState,
        addFamilyMember: (state, action: PayloadAction<familyFormInterface>) => {
            state.familyData.push(action.payload)
        },
        deleteFamilyMember: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0 && action.payload < state.familyData.length) {
                state.familyData.splice(action.payload, 1);
            }
        }


    }
})


export const { reset_family, addFamilyMember, deleteFamilyMember } = familySlice.actions
export default familySlice.reducer