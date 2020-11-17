import React,{Component}  from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { getGalleries, filterGalleries, sortGalleries } from "./Galleries/actions";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';





class Filter extends Component {
  render(props) {
    const isAuth = this.props.isAuth
    // console.log(isAuth)
    return (
 
 
      <div className="filter-bar">
      
        {isAuth &&
        <div className="order-input">
          <label className='order-input-label'>
            Order by
            <select
              className="form-control"
              value={this.props.sort}
              onChange={(event) => {
                this.props.getGalleries()
                this.props.sortGalleries(
                  this.props.filteredGalleries,
                  event.target.value
                );
              }}
            >
              <option value="">Order By</option>
              <option value="newestdate">Newest to Oldest</option>
              <option value="oldestdate">Oldest to Newest</option>
            </select>
          </label>
        </div>
        }
        
        
        {isAuth && 
        <div className="media-input">
        <FormControl component="fieldset" className='search-media-form'>
          <RadioGroup className='search-media-group'
            style={{ 
              display: 'flex', 
              width: 'auto', 
              height: 'auto',
              padding: '10px',
              flexWrap: 'nowrap',
              flexDirection: 'row',
              justifyContent: 'space-evenly'  
            }}
            aria-label="gender" 
            name="gender1" 
            value={this.props.media} 
            onChange={(event) => {
              this.props.filterGalleries(
                this.props.galleries,
                event.target.value
              );
            }}>
              <FormControlLabel value="" control={<Radio />} label="All" />
              <FormControlLabel value="group" control={<Radio />} label="Group" />
              <FormControlLabel value="mixedmedia" control={<Radio />} label="Mixed Media" />
              <FormControlLabel value="painting" control={<Radio />} label="Painting" />
              <FormControlLabel value="photography" control={<Radio />} label="Photography" />
              <FormControlLabel value="printmaking" control={<Radio />} label="Printmaking" />
              <FormControlLabel value="sculpture" control={<Radio />} label="Sculpture" />
          </RadioGroup>
        </FormControl>
        </div>
      }
        
      </div> 









    // end of return
    );
  // end of render 
  }
// end of class component
}


// This will put whatever parts of the store you want into props
const mapStateToProps = (state) => ({
  galleries: state.galleries.items,
  filteredItems: state.galleries.filteredItems,
  isAuth: state.isAuth
});

// These are the actions that you need to use in the component
const mapDispatchToProps = dispatch => bindActionCreators({
  getGalleries, filterGalleries, sortGalleries
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
