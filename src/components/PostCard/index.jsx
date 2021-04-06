import './styles.css';
import P from 'prop-types';

export const PostCard = ({body, title, cover, id}) =>(
    <div className="post">
        <img src={cover} alt={title}></img>
        <div className="post-content">
            <h2> {title}</h2>
            <p>{body}</p>
        </div>
    </div>
);

PostCard.propTypes={
    title: P.string.isRequired,
    body: P.string.isRequired,
    cover: P.string.isRequired,
    id: P.number.isRequired
};