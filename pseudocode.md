## MVP

- User selects difficulty ➡️ easy, medium, hard. Difficulty then stored in state.
- Depending on difficulty an array will be filled with numbers randomly generated from 1 - however many pokemon there are.
- Call is made to API to return pokemon info based on the numbers stored in the array.
  - Return sprite

## Steps

- make call to API ✅
- return pokemon info ✅
- randomize returned pokemon ✅
- duplicate returned array before rendering ✅
- pokemon get rendered onto cards

## Bugs
- render order not matching console.log
- array of IDs in FetchPokemon not matching array of data in FetchPokemon

## Stretch Goals
- Let user select pokedex to narrow selections (value of i in for-loop changes)
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