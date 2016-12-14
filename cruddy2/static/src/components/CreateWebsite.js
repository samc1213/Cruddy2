import React, { PropTypes } from 'react'


class CreateWebsite extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

      return(

        <div>
          <div id="myCarousel" className="carousel slide">
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
              <li data-target="#myCarousel" data-slide-to="3"></li>
            </ol>

            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img className="carouselpic" src="/exampleimage" alt="Chania" />
              </div>

              <div className="carousel-item">
                <img className="carouselpic" src="/exampleimage" alt="Chania" />
              </div>

              <div className="carousel-item">
                <img className="carouselpic" src="/exampleimage" alt="Flower" />
              </div>

              <div className="carousel-item">
                <img className="carouselpic" src="/exampleimage" alt="Flower" />
              </div>
            </div>
            <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <form action="/api/postnewwebsite" method="POST" encType="multipart/form-data">
            <label> Website Name </label>
            <input type="text" name="websitename"/>
            <input type="hidden" name="username" value = {this.props.loggedInUser} />
            <input type="hidden" name="websitetypeid" value="0" />
            <button  className="btn btn-primary" type="submit" > Submit </button>
          </form>

        </div>
    );
    }
  }



export default CreateWebsite
