import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={css.Loader}>
            <h2>Loading images....</h2>
            <RotatingLines
                strokeColor="red"
                strokeWidth="5"
                animationDuration="1"
                width="96"
                visible={true}
            />
        </div>
    )
};
