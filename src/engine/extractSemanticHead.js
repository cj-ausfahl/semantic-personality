// src/engine/extractSemanticHead.js

const STOPWORDS = new Set([
  "the", "a", "an",
  "and", "or", "but",
  "of", "to", "with", "for", "from", "in", "on", "at", "by",
  "is", "are", "was", "were", "be", "being", "been",
  "very", "really", "quite", "too", "so",
  "just", "only", "almost",
  "not", "no"
]);

export function extractSemanticHead(input) {
  if (!input || typeof input !== "string") return null;

  // Normalize
  const cleaned = input
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .trim();

  if (!cleaned) return null;

  const tokens = cleaned.split(/\s+/);

  // Remove stopwords and adverbs (-ly)
  const filtered = tokens.filter(t =>
    !STOPWORDS.has(t) &&
    !t.endsWith("ly")
  );

  if (filtered.length === 0) return null;

    // Prefer verbs
    const verbCandidates = filtered.filter(isLikelyVerb);
    if (verbCandidates.length > 0) {
    return lemmatize(verbCandidates[0]);
    }

    // Prefer noun-like tokens over adjectives
    const nounCandidates = filtered.filter((t, i) =>
        isLikelyNoun(t, i, filtered)
    );
    if (nounCandidates.length > 0) {
    return lemmatize(nounCandidates[0]);
    }

    // Final fallback
    return lemmatize(filtered[0]);

}

// --- Helpers ---

function isLikelyVerb(token) {
  return (
    token.endsWith("ing") ||
    token.endsWith("ed") ||
    COMMON_VERBS.has(token)
  );
}

const COMMON_VERBS = new Set([
  "hold", "break", "leak", "guard", "protect", "control",
  "escape", "enter", "leave", "fail", "resist", "submit",
  "care", "support", "avoid", "withdraw", "confront"
]);

const ADJECTIVE_LIKE = new Set([
  "purple", "blue", "red", "green",
  "strong", "weak", "big", "small",
  "safe", "unsafe", "careful", "sudden",
  "slow", "fast", "quiet", "loud", "yellow"
  "black", "white", "pink", "hot", "cold"
]);

function isLikelyNoun(token, index, tokens) {
  // If token is adjective-like AND followed by another token,
  // treat it as a modifier, not the head
  if (ADJECTIVE_LIKE.has(token) && index < tokens.length - 1) {
    return false;
  }

  // Exclude common adjective suffixes when clearly modifying
  if (
    (token.endsWith("ful") ||
     token.endsWith("less") ||
     token.endsWith("ous") ||
     token.endsWith("ive") ||
     token.endsWith("al")) &&
    index < tokens.length - 1
  ) {
    return false;
  }

  // Otherwise, allow it as noun-like
  return true;
}


function lemmatize(token) {
  // very light stemming, intentionally conservative
  if (token.endsWith("ing") && token.length > 5) {
    return token.slice(0, -3);
  }
  if (token.endsWith("ed") && token.length > 4) {
    return token.slice(0, -2);
  }
  if (token.endsWith("s") && token.length > 3) {
    return token.slice(0, -1);
  }
  return token;
}
