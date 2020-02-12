import React, {useEffect} from 'react'
//Import Material UI components individually to limit load
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core'

//Import necessary redux functions
import {useDispatch, useSelector} from 'react-redux'

import ButtonMenu from '../components/buttons'
import {fetchPosts, fetchUsers} from '../modules/actions/actions'
import Paper from '@material-ui/core/Paper'

const PostPaper = withStyles({
    root:{
        height: 250,
        textOverflow: 'ellipsis',
        padding: 25
    }
})(Paper)

export default function () {
    const dispatch = useDispatch()
    //Get redux state
    const {posts, users, isLoading, hasErrored} = useSelector(state => state.data)
    const [firstLoad, setFirstLoad] = React.useState(true)
    
    //Check if dealer cards have changed
    useEffect(() => {
        if (firstLoad){
            dispatch(fetchPosts())
            dispatch(fetchUsers())
            setFirstLoad(false)
        }
    }, [posts, users])
    return (
      <Container maxWidth={'lg'} className="centralContainer">
        <Grid container spacing={4} alignContent={'center'}>
            {posts.length && users.length ? posts.map((v)=>{
                let [postUser] =  users.filter(user => {
                    return user.id === v.userId})
                return (
                    <Grid item xs={5} key={v.id}>
                        <PostPaper elevation={2}>
                            <Typography variant={'h4'}>
                                {v.title}
                            </Typography>
                            <Typography variant={'h6'} align={'right'}>
                                By {postUser.name}
                            </Typography>
                            <Typography variant={'p'}>
                                {v.body}
                            </Typography>
                        </PostPaper>
                    </Grid>
                )
            })
              :
              <Paper>
                  <Typography variant={'h2'}>Loading...</Typography>
              </Paper>
            }
        </Grid>
      </Container>
    )
}
