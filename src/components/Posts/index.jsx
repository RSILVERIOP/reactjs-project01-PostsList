import './styles.css';
import { PostCard } from "../PostCard";


export const Posts = ({posts=[]}) => (
    <div className="posts">
        {posts.map(post => (    
            <PostCard
                key={post.id}
                body={post.body}
                title={post.title}
                cover={post.cover}
            />
        ))}     
    </div>
);