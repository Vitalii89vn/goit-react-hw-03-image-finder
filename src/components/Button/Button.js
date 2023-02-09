
export const Button = ({onClick}) => {
    return (
        <button type="button" onClick={ ()=> onClick()} className="btnLoadMore">Load more</button>
    )
};