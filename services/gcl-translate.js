/**
 * Visit Google Cloud Translation API for more information on this snippet
 * create new API key
 */

const { TranslationServiceClient } = require("@google-cloud/translate");

// Instantiates a client
const translationClient = new TranslationServiceClient({ keyFilename: './keys/santaquaranta-al-0b5fb507b01e.json' });
const projectId = 'santaquaranta-al';
const location = 'global';

async function translateText(value, { to: languageKey }) {
  // Construct request
  const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [value],
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode: 'en',
      targetLanguageCode: languageKey,
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  // return translation result
  return response.translations[0].translatedText;
}

// test it out > node ./services/gcl-translate.js
// (async () => {
//   try {
//     const text = await translateText('Welcome to the jungle', { to: 'sq' });
//     console.log(text, '>> Translated text <<');
//   } catch (error) {
//     console.error(error);
//   }

//   process.exit(1);
// })();

// re use on the other side
exports.translateText = (value, { to: languageKey }) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(translateText(value, { to: languageKey }));
		}, 100);
	});
};
