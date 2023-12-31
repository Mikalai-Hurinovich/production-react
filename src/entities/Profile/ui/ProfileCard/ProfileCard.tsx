import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entities/Currency/model/types/currency';
import { CurrencySelect } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { CountrySelect } from 'entities/Country';
import { memo } from 'react';
import styles from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

export interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div className={classNames(styles.ProfileCard, { [styles.loading]: true }, [className])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(styles.ProfileCard, {}, [className, styles.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [styles.editing]: !readonly,
    };

    return (
        <div data-testid="ProfileCard" className={classNames(styles.ProfileCard, mods, [className])}>
            <div className={styles.data}>
                { data?.avatar && (
                    <div className={styles.avatarWrapper}>
                        <Avatar src={data?.avatar} />
                    </div>
                ) }
                <Input
                    data-testid="firstname"
                    value={data?.first}
                    placeholder={t('Ваше имя')}
                    className={styles.input}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                />
                <Input
                    data-testid="lastname"
                    value={data?.lastname}
                    placeholder={t('Ваша фамилия')}
                    className={styles.input}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input
                    data-testid="age"
                    value={data?.age}
                    placeholder={t('Ваш возраст')}
                    className={styles.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    data-testid="city"
                    value={data?.city}
                    placeholder={t('Город')}
                    className={styles.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    data-testid="username"
                    value={data?.username}
                    placeholder={t('Введите имя пользователя')}
                    className={styles.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    data-testid="avatar"
                    value={data?.avatar}
                    placeholder={t('Введите ссылку на аватар')}
                    className={styles.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    data-testid="currency"
                    className={styles.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    data-testid="country"
                    className={styles.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    );
});
