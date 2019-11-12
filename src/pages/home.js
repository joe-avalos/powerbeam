import React from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core'

const CenterPaper = withStyles({
    root:{
        width: '70%',
        height: '60%',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        padding: 25
    }
})(Paper)

export default function () {
    
    return (
      <Container maxWidth={'lg'} className="centralContainer">
          <CenterPaper>
              <img src="bitsoLogo.png" alt="Bitso Gaming" className="logo" />
              <Typography variant={'h3'}>
                  Bitso Gaming
              </Typography>
          </CenterPaper>
      </Container>
    )
}
