## MVP

- User selects difficulty ➡️ easy, medium, hard. Difficulty then stored in state.
- Depending on difficulty an array will be filled with numbers randomly generated from 1 - however many pokemon there are.
- Call is made to API to return pokemon info based on the numbers stored in the array.
  - Return sprite

## To do

- make call to API ✅
- return pokemon info ✅
- randomize returned pokemon ✅
- duplicate returned array before rendering ✅
- pokemon get rendered onto cards ✅
- matching logic --> write function to match and that function is fired in componentDidUpdate. make MatchLogic a HOC? ✅
- using flipped boolean conditionally add to state and flip card ✅
- win condition logic ✅
- move high score form submit into its own component ✅
- refactor high scores to be sorted by difficulty ✅
- only show high score submit form if high score is eligible
    - take the #5 score on the leaderboard, submit to firebase and have the submit form listen to that node, only if submitform score is lower than the node should the submit form appear
- style winlogic component

## Form requirements
- Quickplay (5 pairs, any pokemon)
- Region-based
  - Kanto 1-151
  - Johto 152-251
  - Hoenn 252-386
  - Sinnoh 387-493
  - Unova 494-649
  - Kalos 650-721

## Bugs
- when cards are rendered, changing region re-renders the component. conditional setstate?
- after victory, changing REGION and/or DIFFICULTY resets the board but the sweet alert still appear

## Stretch Goals
<!-- - Let user select pokedex to narrow selections (value of i in for-loop changes) -->
- Leaderboards for each dex (not difficulties)
  - Difficulties:
    - Easy (gen 1 starters, pikachu, 4 pairs)
    - Kanto (gen 1, 6 pairs)
    - Johto (gen 2, 6 pairs)
    - Hoenn (gen 3, 10 pairs)
    - Sinnoh (gen 4, 10 pairs)
    - Unova (gen 5, 10 pairs)
    - Kalos (gen 6, 12 pairs)
    - Pokemon Master (gen 1 - gen 6, 15 pairs)
- Return pokemon types that match to a color, use colors to create type-themed backgrounds for each card.
- Sign in to save progress

## Ideas

- In addition to pokedex-based difficulties, other ones such as:
  - legendaries
  - type-based