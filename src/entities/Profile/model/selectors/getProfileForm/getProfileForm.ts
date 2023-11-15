import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileForm = (state: StateSchema) => {
    console.log(state.profile?.form);
    return state.profile?.form;
};
