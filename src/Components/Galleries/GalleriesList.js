/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Gallery from './Gallery';
import { getGalleries, getGallery } from './actions';
import Grid from '@material-ui/core/Grid';



class GalleriesList extends PureComponent {

  constructor() {
    super()
    this.state = {
      ...this.state,
      search: ''
    }
  }

  componentDidMount() {
    const { getGalleries, getGallery, isLoaded } = this.props;
    if (!isLoaded) {
      // getGalleries();
      // getGallery()
    }
  }

  updateSearch(event) {
    this.setState({search: event.target.value})
    // console.log(this.state.search)
  }

  render() {


    const gallery = this.props.gallery
    console.log('gallery: ', gallery)

    const galleries = this.props.galleries
    console.log('galleries: ', galleries)

    const filteredGalleries = this.props.filteredItems
    console.log('filteredGalleries: ', filteredGalleries)

    // let filteredGalleries = this.props.galleries.filter(
    //   (gallery) => {
    //     return (
    //       gallery.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 
    //       || gallery.artist.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    //       || gallery.date.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    //       || gallery.show.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          
    //     )
    //     }
    // )

    return(
      <div  className="gallery-list"> 
        {/* {this.props.isLoaded &&    
        <input 
          type='text'
          className='search-input' 
          placeholder='Search Galleries' 
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        } */}
        <Grid display="flex" container spacing={6} style={{padding: "3%"}}>
            {filteredGalleries.map(gallery => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Gallery 
                      key={gallery.id}
                      gallery={gallery}
                  />
              </Grid>
            ))}
        </Grid>
      </div> 
    )
  }
}

// This will put whatever parts of the store you want into props
const mapStateToProps = state => ({
  gallery: state.galleries.gallery,
  galleries: state.galleries.items,
  isLoaded: state.galleries.galleriesLoaded,
  filteredItems: state.galleries.filteredItems,
});

// These are the actions that you need to use in the component
const mapDispatchToProps = dispatch => bindActionCreators({
  getGalleries, getGallery,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GalleriesList);

