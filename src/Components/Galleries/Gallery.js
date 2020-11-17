import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
 import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


export default function Gallery({gallery}){
  console.log(gallery.exhibits[0])
  const useStyles = makeStyles((theme) => ({
    root: {
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
    },
    control: {
    padding: theme.spacing(2)
    },
    media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: 6,
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
    }
  }));

  const classes = useStyles();

  
  return (
    <div className="gallery-card">
        <Card variant='outlined' spacing={3} className={classes.fullHeightCard}>
        <Link to={`/${gallery.id}`}>
          <CardMedia 
            className={classes.media}
            image={gallery.exhibits[0].showHero}
            title="Exhibit Image"
          />
        </Link>
                
          <CardContent className='gallery-card-flex-container'>
            <Box component="p" align='center'>
              <div className='gallery-logo'>
                <Avatar alt={gallery.name} src={gallery.logo} border={5}/>
              </div>
            </Box>
            <TextInfoContent
              overline={gallery.name}
              heading={gallery.exhibits[0].title}
              body={gallery.exhibits[0].date}
            />
            <Box component="p" css={{width: "88%", margin: '2vh auto 0'}}>
              <Typography variant="body2" color="textSecondary" component="p">{gallery.exhibits[0].showTeaser}</Typography>
            </Box>
            <Box component="div" className="action-buttons-container">
            <CardActions disableSpacing style={{marginTop: "8%"}} className='action-buttons'>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
            </Box>

          </CardContent>
        </Card>
    </div>
  )
}



//This makes each of the following required - gallery may not show if data is missing
Gallery.propTypes = {
  gallery: PropTypes.shape({
    date: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
  }).isRequired,
};


