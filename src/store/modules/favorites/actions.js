export function setFavorite(selectedCharacter) {
  return {
    type: "SET_FAVORITE",
    selectedCharacter,
  };
}

export function removeFavorite(selectedCharacter) {
  return {
    type: "REMOVE_FAVORITE",
    selectedCharacter,
  };
}

export function getFavorites() {
  return {
    type: "GET_FAVORITES",
  };
}
