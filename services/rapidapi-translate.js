/**
 * Visit https://google-translate1.p.rapidapi.com/language/translate/v2
 * for more information on this snippet
 * create new API key and subscibe for free
 */
const axios = require('axios');

const rapiAPIKey = '44d35f8abcmsh074f31aa3416beap182b44jsn1ba4c6ed1ef2';
const encodedParams = new URLSearchParams();

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': rapiAPIKey,
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
  data: encodedParams,
};

// test it
// (async () => {
//   try {
//     const response = await axios.request(options);
//     console.log(JSON.stringify(response.data.data.translations[0].translatedText));
//   } catch (error) {
//     console.error(error);
//   }

//   process.exit(1);
// })();

// re use on the other side
async function translateFree(value, { to: languageKey }) {
  try {
    encodedParams.set('q', value);
    encodedParams.set('target', languageKey);
    encodedParams.set('source', 'en');

    const response = await axios.request(options);
    const text = response.data.data.translations[0].translatedText;
    return text;
  } catch (error) {
    console.error(error);
  }
};

exports.translateFree = (value, { to: languageKey }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(translateFree(value, { to: languageKey }));
    }, 3000);
  })
}
