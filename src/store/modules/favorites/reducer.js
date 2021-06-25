import produce from "immer";

const INITIAL_STATE = {
  characters: [],
};

function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_FAVORITE": {
      return produce(state, (draft) => {
        const index = draft.characters.findIndex(
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

    default:
      return state;
  }
}

export default favorites;
