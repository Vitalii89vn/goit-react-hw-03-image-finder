import { RotatingLines } from  'react-loader-spinner'
export const Loader = () => {
    return (
        <div>
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
