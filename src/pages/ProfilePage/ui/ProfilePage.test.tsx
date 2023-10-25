import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { userEvent } from '@storybook/testing-library';
import { profileReducer } from 'entities/Profile';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { ProfileCard, ProfileCardProps } from '../../../entities/Profile/ui/ProfileCard/ProfileCard';

const mockProps: Partial<ProfileCardProps> = {
    isLoading: false,
    error: '',
    readonly: false,
    data: {
        id: '1',
        first: 'John',
        lastname: 'Doe',
        age: 21,
        currency: Currency.USD,
        country: Country.Belarus,
        city: 'Minsk',
        username: 'admin213',
        avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
    },
};
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));
const mockOnChangeFirstname = jest.fn();
const mockOnChangeLastname = jest.fn();
const mockOnChangeAge = jest.fn();
const mockOnChangeCity = jest.fn();
const mockOnChangeUsername = jest.fn();
const mockOnChangeAvatar = jest.fn();
const mockOnChangeCountry = jest.fn();
const mockOnChangeCurrency = jest.fn();
describe('ProfileCard', () => {
    beforeEach(() => {
        componentRender(<ProfilePageHeader />, {
            initialState: {
                profile: {
                    readonly: true,
                    data: mockProps.data,
                    form: mockProps.data,
                },
                user: {
                    authData: {
                        id: '1',
                        username: 'John',
                    },
                },
            },
            asyncReducers: {
                profile: profileReducer,
            },
        });
        componentRender(<ProfileCard
            {...mockProps}
            onChangeFirstname={mockOnChangeFirstname}
            onChangeLastname={mockOnChangeLastname}
            onChangeAge={mockOnChangeAge}
            onChangeCity={mockOnChangeCity}
            onChangeUsername={mockOnChangeUsername}
            onChangeAvatar={mockOnChangeAvatar}
            onChangeCountry={mockOnChangeCountry}
            onChangeCurrency={mockOnChangeCurrency}
        />);
    });
    test('should switch readonly', async () => {
        await userEvent.click(screen.getByTestId('edit-button'));
        expect(screen.getByTestId('save-button')).toBeInTheDocument();
    });
    test('renders profile card with data', async () => {
        expect(screen.getByTestId('ProfileCard')).toBeInTheDocument();
        expect(screen.getByTestId('firstname')).toHaveValue('John');
        expect(screen.getByTestId('lastname')).toHaveValue('Doe');
        expect(screen.getByTestId('age')).toHaveValue('21');
        expect(screen.getByTestId('city')).toHaveValue('Minsk');
        expect(screen.getByTestId('username')).toHaveValue('admin213');
        expect(screen.getByTestId('avatar')).toHaveValue('https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg');
        expect(screen.getByText('USD')).toBeInTheDocument();
        expect(screen.getByText('Belarus')).toBeInTheDocument();
    });

    test('allows editing input fields', async () => {
        const firstNameInput = screen.getByTestId('firstname');
        const lastnameInput = screen.getByTestId('lastname');
        const ageInput = screen.getByTestId('age');
        const cityInput = screen.getByTestId('city');
        const usernameInput = screen.getByTestId('username');
        const avatarInput = screen.getByTestId('avatar');

        firstNameInput.setAttribute('value', 'Jane');
        expect(firstNameInput.getAttribute('value')).toBe('Jane');

        lastnameInput.setAttribute('value', 'lastname');
        expect(lastnameInput.getAttribute('value')).toBe('lastname');

        ageInput.setAttribute('value', '12');
        expect(ageInput.getAttribute('value')).toBe('12');

        cityInput.setAttribute('value', 'Minsk');
        expect(cityInput.getAttribute('value')).toBe('Minsk');

        usernameInput.setAttribute('value', 'username');
        expect(usernameInput.getAttribute('value')).toBe('username');

        avatarInput.setAttribute('value', 'avatar');
        expect(avatarInput.getAttribute('value')).toBe('avatar');
    });
    test('allows editing select fields', async () => {
        await userEvent.click(screen.getByTestId('edit-button'));
        const countrySelect = screen.getByText('Belarus');
        const currencySelect = screen.getByText('USD');

        fireEvent.click(currencySelect);
        await userEvent.click(screen.getByRole('option', { name: 'EUR' }));

        fireEvent.click(countrySelect);
        fireEvent.click(screen.getByRole('option', { name: 'Ukraine' }));

        expect(screen.getByText('USD')).toBeInTheDocument();
        expect(screen.getByText('Belarus')).toBeInTheDocument();
    });
    test('should don\'t allow to save when validation triggered', async () => {
        await userEvent.click(screen.getByTestId('edit-button'));

        const firstNameInput = screen.getByTestId('firstname');
        await userEvent.clear(firstNameInput);
        const saveButton = screen.getByTestId('save-button');
        await userEvent.click(saveButton);

        expect(saveButton).toBeInTheDocument();
    });
});
