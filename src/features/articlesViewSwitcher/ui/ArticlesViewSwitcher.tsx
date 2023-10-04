import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleViewEnum } from 'entities/Article';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import styles from './ArticlesViewSwitcher.module.scss';

interface ArticlesViewSwitcherProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  onViewItemClick: (view: ArticleViewEnum) => void;
  view: ArticleViewEnum;
}

export const ArticlesViewSwitcher: FC<ArticlesViewSwitcherProps> = ({ className, view, onViewItemClick }) => {
    const { t } = useTranslation();
    const views = [
        {
            view: ArticleViewEnum.LIST,
            icon: TiledIcon,
        },
        {
            view: ArticleViewEnum.PLATE,
            icon: ListIcon,
        },
    ];

    function handleSwitchView(currentView: ArticleViewEnum) {
        if (currentView !== view) {
            onViewItemClick(currentView);
        }
    }

    return (
        <div className={classNames(styles.articlesViewSwitcher, {}, [className])}>
            {views.map((item) => (
                <span
                    key={item.view}
                    onClick={() => handleSwitchView(item.view)}
                >
                    <Icon
                        className={classNames(styles.icon, { [styles.active]: item.view === view })}
                        Svg={item.icon}
                    />
                </span>
            ))}
        </div>
    );
};
