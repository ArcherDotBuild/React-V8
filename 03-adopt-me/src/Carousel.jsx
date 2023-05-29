import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // If you wanna have default props, you have to understand what static default props is
  // This is like, hey, if you don't pass anything into the carousel, what is nice about
  // that is now i can just assume that i always have images whether or not the user
  // provides it to me
  static defaultProps = {
    images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      // This is called a unary plus which takes a string and turns it into a number
      active: +e.target.dataset.index
    })
  }

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
            onClick={this.handleIndexClick}
            data-index={index}
              key={photo}
              src={photo}
              className={index == active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;