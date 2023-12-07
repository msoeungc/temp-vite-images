import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { useGlobalContext } from "./context";

const url =
// Accessing our ENV variable to complete our dynamic URL
  `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  // function for get request using useQuery hook
  //   Getting array of images
  const response = useQuery({
    // Pass in searchTerm as part of queryKey other wise, images array will
    // not update when changing the searchTerm value only in context
    // Need to change the cached values of images array by including searchTerm
    // React Query also handles the refetching and checking if the values have changed
    queryKey: ["images", searchTerm],
    queryFn: async () => {
        // Template string for dynamic search query
        const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });

  //   Handling loading state
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  //   Error handling
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  //   Handling empty array result
  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>There were no results found...</h4>
      </section>
    );
  }

  return (
    // Rendering images
    <section className="image-container">
      {results.map((item) => {
        {
          /* optional chaining incase property is not there */
        }
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className="img"
          ></img>
        );
      })}
    </section>
  );
};

export default Gallery;
