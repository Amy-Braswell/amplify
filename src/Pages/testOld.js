import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import STORE from '../../Components/Store'
import GalleryCard from '../../Components/GalleryCard/GalleryCard'


export default function Home() {

    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 345,
        },
        card: {
            marginTop: theme.spacing(25),
            marginBottom: theme.spacing(25),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: theme.spacing(4),
          },
        media: {
          height: 0,
          paddingTop: '56.25%', // 16:9
        },
        expand: {
          transform: 'rotate(0deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        },
        expandOpen: {
          transform: 'rotate(180deg)',
        },
        avatar: {
          backgroundColor: red[500],
        },
      }));
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    const [galleries, setGalleries] = useState(STORE)

    const returnedGalleries = galleries.galleries

    return(
        <main className='App'>
            <header className='App-header'> 
                <h1>iArt</h1>
            </header>

            <div className='App-list'>
                {returnedGalleries.map(gallery => (

                    <Card
                        raised='true'
                        variant="outlined"
                        className={classes.root}
                        key={gallery.id}
                        id={gallery.id}
                    >   
                        <CardHeader
                            avatar={
                            <Avatar 
                                aria-label="gallery-logo" 
                                className={classes.avatar} 
                                alt='Galley Logo'
                                src={gallery.logo}
                            />
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            titleTypographyProps={{variant:'h5' }}
                            title={gallery.show}
                            subheader={gallery.name}
                        />
                        <CardMedia
                            className={classes.media}
                            image="https://res.cloudinary.com/amy-braswell/image/upload/v1603234930/iArt-Chicago/Chicago_Bkgrnd_ycg0h7.jpg"
                            title="Exhibit Hero"
                        />

                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton
                                className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant="h6" noWrap="true" color="textPrimary" component="h2">{gallery.date}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">{gallery.showDescription}</Typography>
                            </CardContent>
                        </Collapse>
                                                
                    </Card>

                ))}
            </div>
        </main>
    )   
}
