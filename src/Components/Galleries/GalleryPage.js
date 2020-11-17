/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Gallery from './Gallery';
// import { getGallery, resetGallery } from './actions';



class GalleryDetail extends Component {
  componentDidMount() {
    const { getGallery, match } = this.props;
    getGallery(match.params.id);
  }

  componentWillUnmount() {
    this.props.resetGallery();
  }

  render() {
    const { gallery } = this.props;
    if (!gallery.id) return null;
    return (
      <GalleryWrapper backdrop={`${gallery.logo}`}>
        <GalleryInfo>
            <Gallery src={`${gallery.logo}`} alt={gallery.name} />
          <div>
            <h1>{gallery.show}</h1>
            <h3>{gallery.date}</h3>
            <p>{gallery.showTeaser}</p>
          </div>
        </GalleryInfo>
      </GalleryWrapper>
    );
  }
}

const mapStateToProps = state => ({
  gallery: state.galleries.gallery,
  isLoaded: state.galleries.galleryLoaded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // getGallery,
  // resetGallery,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GalleryDetail);

const GalleryWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const GalleryInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
