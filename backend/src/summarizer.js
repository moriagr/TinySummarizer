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

export async function summarize(text, numSentences = 10) {
  const sentences = splitSentences(text);
  const allWords = tokenize(text);

  const freqMap = {};
  allWords.forEach(word => {
    freqMap[word] = (freqMap[word] || 0) + 1;
  });

  const scores = sentences.map((sentence, i) => {
    const words = tokenize(sentence);
    if (words.length === 0) return { sentence: '', score: 0 };

    let score = words.reduce((sum, word) => {
      return sum + (freqMap[word] || 0);
    }, 0);
    return { sentence: sentence.trim(), score, index: i };
  });
  // Filter out sentences with zero score
  const filteredScores = scores.filter(s => s.score > 0);
  const top = filteredScores.sort((a, b) => b.score - a.score).slice(0, numSentences);
  top.sort((a, b) => a.index - b.index); // sort by original index

  return top.map(s=>s.sentence).join(' ');
}
