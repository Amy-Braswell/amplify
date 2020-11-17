import React, { Component } from "react";
import { connect } from "react-redux";
import { filterGalleries, sortGalleries } from "./Components/Galleries/actions";
// import {sortGalleries} from './Components/Galleries/actions'

class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">{`${this.props.filteredItems.length} galleries found.`}</div>
        <div className="col-md-4">
          <label>
            Order by
            <select
              className="form-control"
              value={this.props.sort}
              onChange={(event) => {
                this.props.sortGalleries(
                  this.props.filteredGalleries,
                  event.target.value
                );
              }}
            >
              <option value="">Select</option>
              <option value="newestdate">Newest to Oldest</option>
              <option value="oldestdate">Oldest to Newest</option>
            </select>
          </label>
        </div>
        {/* <div className="col-md-4">
          <label>
            {" "}
            Filter Size
            <select
              className="form-control"
              value={this.props.size}
              onChange={(event) => {
                this.props.filterProducts(
                  this.props.products,
                  event.target.value
                );
              }}
            >
              <option value="">ALL</option>
              <option value="x">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </label>
        </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  galleries: state.galleries,
  filteredGalleries: state.galleries.filteredGalleries,
  sort: state.galleries.sort,
  items: state.galleries.items,
  size: state.galleries.size
});
export default connect(mapStateToProps, { filterGalleries, sortGalleries })(
  Filter
);