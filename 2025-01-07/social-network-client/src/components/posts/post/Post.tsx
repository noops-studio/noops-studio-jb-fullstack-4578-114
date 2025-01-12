import PostModel from '../../../models/posts/Post'
import './Post.css'

interface PostProps {
post: PostModel;
}
export default function Post(props:PostProps): JSX.Element {

    const {title,body,createdAt} = props.post
    const {name} = props.post.user
    return (
        <div className='Post'>
            <div>
                {title}
            </div>
            <div>
                {name} at {createdAt}
            </div>
            <div>
                {body}
            </div>
        </div>
    )
}