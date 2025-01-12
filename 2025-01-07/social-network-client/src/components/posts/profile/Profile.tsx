import { useEffect, useState } from 'react'
import './Profile.css'
import PostModel from '../../../models/posts/Post'
import profile from '../../../services/Profile'
import Post from '../post/Post'

export default function Profile(): JSX.Element {

    // posts: Post[]
    const [posts, setPosts] = useState<PostModel[]>([])

    useEffect(() => {
        profile.getProfile()
            .then(setPosts)
            .catch(alert)
    }, [])

    return (
        <div className='Profile'>
            {posts.map(post => <Post key={post.id} post={post} ></Post>)}
        </div>
    )
}