import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContenxt";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import Modal from "./Modal";

const Details = () => {
  const  [showModal, setShowModal ] = useState(false);

  // Navigate is just a function to programmatically reroute someone somewhere
  const navigate = useNavigate()

  // Here, I don't actually care about reading from the adoptedPet, i only
  // care about writing to it. So I'm just gonne put _ here
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const { id } = useParams();
  // So this is how useQuery works, we're gonna give it a key of what we're requesting
  // So then it knows later, if I request the exact same key later, I'm gonna get the
  // exact same response. It's not gonna go fetch that from the API again cuz i gave
  //  it a cache time of Infinity

  // If you don't have that in your cache, run this (fetchPet )
  const results = useQuery(["details", id], fetchPet);

  if (results.isError) {
    return <h2>Oh no!</h2>;
  }

  // The first time this comes back, it's not going to have that cache
  // YOU CAN'T AWAIT IN A RENDER FUNCTION
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">👾</h2>
      </div>
    );
  }

  // I can now assume past here, pet is available and pet has loaded
  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}{" "}
        </h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button onClick={() => {setAdoptedPet(pet); navigate('/')}}>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : // You can always render NULL which rendering null just does nothing
        null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

// function DetailsErrorBoundary(props) {
//   return (
//     <ErrorBoundary
//       errorComponent={
//         <h2>
//           There was an error with this listing.{" "}
//           <Link to="/">Click here to go back to the gome page.</Link>
//         </h2>
//       }
//     >
//       <Details {...props} />
//     </ErrorBoundary>
//   );
// }

export default DetailsErrorBoundary;
