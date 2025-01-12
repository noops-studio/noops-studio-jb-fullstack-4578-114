import { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, Typography } from '@mui/material'
import PostModel from '../../../models/posts/Post'
import feed from '../../../services/Feed'

export default function Feed() {
    const [posts, setPosts] = useState<PostModel[]>([])

    useEffect(() => {
        feed.getFeed()
            .then(setPosts)
            .catch(alert)
    }, [])

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
                {posts.map(({ id, title }) => (
                    <Grid item xs={12} sm={6} md={4} key={id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
