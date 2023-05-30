import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  // Every time that there's an error, it's going to call this function and you're gonna give it like
  // if you encounter an error, this is what I want you to set the new state to be.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Typically you would log this to something like TrackJS or NewRelic
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing.{" "}
          <Link to="/">Click here to go back to the gome page.</Link>
        </h2>
      );

      // return this.props.errorComponent
    }
    // If there is no error we want this to just seamlessly pass through
    return this.props.children;
  }

  // render() {
  //   if (this.state.hasError) {     
  //     return this.props.errorComponent
  //   }    
  //   return this.props.children;
  // }
}


export default ErrorBoundary