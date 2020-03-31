export const state = () => ({
  counter: 0,
  favorites: [],
  VATincluded: true
});

export const mutations = {
  increment(state) {
    state.counter++;
  },
  toggleFavorite(state, prodID) {
    let favorites = state.favorites;
    if (favorites.includes(prodID)) {
      favorites = favorites.slice(favorites.indexOf(prodID), 1);
    } else {
      favorites.push(prodID);
    }
  },
  setVATincluded(state, vatincluded) {
    state.VATincluded = vatincluded;
  }
};
