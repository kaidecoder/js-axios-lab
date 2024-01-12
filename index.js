import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
let breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");

// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_f442WpIpdmrvNYLgvqJ0J8GK7oIq3nbSIci46khmdQGVzslHpzf6QNYWy5vjyM9A";


/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */

(async function initialLoad() {
  const response = await axios("https://api.thecatapi.com/v1/breeds");
  console.log(response);

  if (response.data.length === 0) {
    console.log("No breeds found!");
    return;
  }

  response.data.forEach((breed) => {
    let option = document.createElement("option");
    option.setAttribute("value", `${breed.id}`);
    option.innerHTML = `${toTitleCase(breed.name)}`;
    breedSelect = document.getElementById("breedSelect");
    breedSelect.appendChild(option);
  });

  breedSelect.addEventListener("change", async function (e) {
    const cats = await axios(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${e.target.value}`,
    );
    console.log("cats", cats);

    Carousel.clear();
    if (cats.data.length === 0) {
        console.log("No cats found for this breed!");
        return;
      }
    // Populate the Carousel
    cats.data.forEach((cat) => {
      console.log(cat);
      const imgSrc = cat.url;
      const imgAlt = breedSelect.value;
      const imgId = cat.id;

      Carousel.appendCarousel(
        Carousel.createCarouselItem(imgSrc, imgAlt, imgId),
      );
    });
    Carousel.start();
  });
})();

console.log(breed)

function toTitleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */

export default async function favorite(imgId) {
  try {
    // Check if the image is already a favorite
    const checkFavoriteResponse = await axios({
      url: `https://api.thecatapi.com/v1/favourites?image_id=${imgId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_f442WpIpdmrvNYLgvqJ0J8GK7oIq3nbSIci46khmdQGVzslHpzf6QNYWy5vjyM9A",
      },
    });
    console.log("fav response", checkFavoriteResponse);
    if (checkFavoriteResponse.data.length > 0) {
      // If the image is already a favorite, delete it
      const deleteResponse = await axios({
        url: `https://api.thecatapi.com/v1/favourites/${checkFavoriteResponse.data[0].id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "live_f442WpIpdmrvNYLgvqJ0J8GK7oIq3nbSIci46khmdQGVzslHpzf6QNYWy5vjyM9A",
        },
      });
      
      // image deleted
      console.log("Image deleted from favorites:", imgId);
    } else {
      // If the image is not a favorite, add it
      const addResponse = await axios({
        url: "https://api.thecatapi.com/v1/favourites",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "live_f442WpIpdmrvNYLgvqJ0J8GK7oIq3nbSIci46khmdQGVzslHpzf6QNYWy5vjyM9A",
        },
        data: JSON.stringify({
          image_id: imgId,
        }),
      });

      // image added
      console.log("Image added to favorites:", imgId);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getFavorites() {
  try {
    const response = await axios({
      method: "GET",
      url: "https://api.thecatapi.com/v1/favourites",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_f442WpIpdmrvNYLgvqJ0J8GK7oIq3nbSIci46khmdQGVzslHpzf6QNYWy5vjyM9A",
      },
    });

    // return the favorites data
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}

getFavouritesBtn.addEventListener("click", async () => {
  try {
    // Clear existing items in the carousel
    Carousel.clear();

    // Fetch favorites
    const favorites = await axios("/favorites");

    // Iterate through favorites and append each item to the carousel
    favorites.forEach((favorite) => {
      const imgSrc = favorite.image.url; // Adjust this based on the structure of your favorite object
      const imgAlt = favorite.image_id; // You can customize the alt text
      const imgId = favorite.image.id; // Adjust this based on the structure of your favorite object

      const carouselItem = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);
      Carousel.appendCarousel(carouselItem);
    });

    // Start the carousel after appending items
    Carousel.start();
  } catch (error) {
    console.log(error);
  }
});

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
