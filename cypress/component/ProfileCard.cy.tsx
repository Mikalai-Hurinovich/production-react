import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import ProfilePage from 'pages/ProfilePage/ui/ProfilePage';
import { componentRenderOptions, GlobalProvider } from 'shared/lib/tests/componentRender/componentRender';
import 'app/styles/index.scss';
import { profileReducer } from 'entities/Profile';

const initialData = {
    id: '1',
    first: 'Mikola',
    lastname: 'Huryno',
    age: 22,
    currency: Currency.USD,
    country: Country.Belarus,
    city: 'Minsk',
    username: 'user123',
    avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
};
const options: componentRenderOptions = {
    initialState: {
        profile: { form: initialData, data: initialData },
        user: {
            authData: {
                id: '1',
                username: 'Mikola',
            },
            _inited: true,
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};
describe('ProfileCard.cy.tsx', () => {
    it('playground', () => {
        cy.mount(
            <GlobalProvider options={options}>
                <ProfilePage />
            </GlobalProvider>,
        );
    });
});
