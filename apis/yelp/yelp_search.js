const axios = require('axios');
const { yelpAPIKey } = require('../../auth.json');

const yelpBusiness = (term, place) => {
  return axios.get(
    `https://api.yelp.com/v3/businesses/search`, {
      headers: {
        'Authorization': `Bearer ${yelpAPIKey}`
      },
      params: {
        term,
        location: place,
        attributes: "hot_and_new",
        sort: "rating"
      },
    }
  );
};

async function searchYelp(term, place) {
  try {
    const yelpBizData = await yelpBusiness(term, place);
    console.log(yelpBizData.data.businesses[0])
    const { url, location, name, rating, review_count, categories } = yelpBizData.data.businesses[0];
    const locationJoined = location.display_address.join(' ');
    const categoriesJoined = categories.map(data => {
      return `\`${data.title}\``;
    }).join(' ');
    // Converts rating to stars
    let starRating = "★".repeat(rating);
    rating.toString().includes('.5') ? starRating = `${starRating}½` : '';
    return `${name}\n${locationJoined}\n${categoriesJoined}\n${starRating}\nReview Count: \`${review_count}\`\n\n${url}`;
  } catch (err) {
    return `There's nothing new to chow here.`
  }
};

module.exports = searchYelp;
