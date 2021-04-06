import './styles.css';
import { PostCard } from "../PostCard";
import P from 'prop-types';


export const Posts = ({posts=[]}) => (
    <div className="posts">
        {posts.map(post => (    
            <PostCard
                key={post.id}
                id={post.id}
                body={post.body}
                title={post.title}
                cover={post.cover}
            />
        ))}     
    </div>
);

Posts.propTypes ={
    posts: P.arrayOf(P.shape({
        title: P.string.isRequired,
        body: P.string.isRequired,
        cover: P.string.isRequired,
        id: P.number.isRequired
    }))
};