import { useEffect, useState } from 'react'
import './Profile.css'
import PostModel from '../../../models/posts/Post'
import profile from '../../../services/Profile'
import Post from '../post/Post'
import NewPost from '../new/NewPost'

export default function Profile(): JSX.Element {

    // posts: Post[]
    const [posts, setPosts] = useState<PostModel[]>([])

    useEffect(() => {
        profile.getProfile()
            .then(setPosts)
            .catch(alert)
    }, [])



    return (
        <div className='posts-container'>
            <NewPost/>
            {posts.map(post => <Post key={post.id} post={post} ></Post>)}
        </div>
    )
}