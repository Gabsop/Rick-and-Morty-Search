export function setFavorite(selectedCharacter) {
  return {
    type: "SET_FAVORITE",
    selectedCharacter,
  };
}
