var quotes = [
      'I claim that a new regime of technologies for holding and shaping past experience has been developed through a process I call databasing the world…', 'Build a man a fire, and he will be warm for a day. Set a man on fire, and he will be warm for the rest of his life.', 'East is East, and West is San Francisco, according to Californians. Californians are a race of people; they are not merely inhabitants of a state.', 'So we beat on, boats against the current, borne back ceaselessly into the past.'
      ]

function newQuote() {
  var randomNumber = Math.floor(Math.random() * (quotes.length));
  document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
}



