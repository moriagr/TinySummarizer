// stopwords (can be expanded)
const STOPWORDS = new Set([
  'the', 'is', 'in', 'and', 'of', 'a', 'to', 'it', 'that', 'with', 'as', 'for', 'its',
  'on', 'at', 'by', 'an', 'be', 'this', 'which', 'or', 'from', 'but', 'are', 'was',
  'were', 'has', 'have'
]);

// Split into sentences
function splitSentences(text) {
  return text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
}

// Tokenize & clean words
function tokenize(sentence) {
  return sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word && !STOPWORDS.has(word));
}

export async function summarize(text, numSentences = 3) {
  const sentences = splitSentences(text);
  const sentenceWords = sentences.map(tokenize);

  const scores = sentences.map((_, i) => {
    let score = 0;
    for (let j = 0; j < sentences.length; j++) {
      if (i !== j) {
        const common = sentenceWords[i].filter(word => sentenceWords[j].includes(word));
        score += common.length;
      }
    }
    return { sentence: sentences[i].trim(), score };
  });

  scores.sort((a, b) => b.score - a.score);

  const summary = scores.slice(0, numSentences).map(s => s.sentence).join(' ');
  return summary;
}
