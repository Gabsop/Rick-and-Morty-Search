import produce from "immer";

const INITIAL_STATE = {
  characters: [],
};

function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_FAVORITES": {
      return produce(state, (draft) => {
        var localCharacters = JSON.parse(
          localStorage.getItem("FavoritedCharacters")
        );
        if (localCharacters) {
          draft.characters = localCharacters;
        }
      });
    }

    case "SET_FAVORITE": {
      return produce(state, (draft) => {
        const index = draft.characters?.findIndex(
          (character) => character.id === action.selectedCharacter.id
        );
        if (index < 0) {
          draft.characters.push(action.selectedCharacter);
          localStorage.setItem(
            "FavoritedCharacters",
            JSON.stringify(draft.characters)
          );
        }
      });
    }

    case "REMOVE_FAVORITE": {
      return produce(state, (draft) => {
        const index = draft.characters?.findIndex(
          (character) => character.id === action.selectedCharacter.id
        );
        if (index >= 0) {
          draft.characters?.splice(index, 1);
          localStorage.removeItem("FavoritedCharacters");
          localStorage.setItem(
            "FavoritedCharacters",
            JSON.stringify(draft.characters)
          );
        }
      });
    }

    default:
      return state;
  }
}

export default favorites;
