// src/engine/analyzer.js

export function analyze(responses) {
  const analysis = {
    counts: {},
    sections: {},
    repetitions: {},
    timing: {},
    echoes: {}
  };

  let previousTime = null;

  responses.forEach(r => {
    const word = normalize(r.response);

    // Count global word frequency
    analysis.counts[word] = (analysis.counts[word] || 0) + 1;

    // Section-level grouping
    if (!analysis.sections[r.section]) {
      analysis.sections[r.section] = [];
    }
    analysis.sections[r.section].push(word);

    // Timing
    if (previousTime !== null) {
      const delta = r.timestamp - previousTime;
      if (!analysis.timing[r.section]) {
        analysis.timing[r.section] = [];
      }
      analysis.timing[r.section].push(delta);
    }
    previousTime = r.timestamp;
  });

  // Repetition detection
  Object.entries(analysis.counts).forEach(([word, count]) => {
    if (count > 1) {
      analysis.repetitions[word] = count;
    }
  });

  // Cross-section echoes
  Object.entries(analysis.sections).forEach(([section, words]) => {
    words.forEach(word => {
      if (!analysis.echoes[word]) {
        analysis.echoes[word] = new Set();
      }
      analysis.echoes[word].add(section);
    });
  });

  // Convert Sets to arrays
  Object.keys(analysis.echoes).forEach(word => {
    analysis.echoes[word] = Array.from(analysis.echoes[word]);
  });

  return analysis;
}

function normalize(word) {
  return word.toLowerCase().trim();
}
