import * as _ from "lodash";

enum Suit { Club, Diamond, Spade, Heart };

enum Rank { Two = 2, Three, Four, Five, Six, Seven, Eight,
            Nine, Ten, Jack, Queen, King, Ace };

type Card = [Suit, Rank];

type Hand = Card[];

type Deck = Card[];

type Player = { name: string, hand: Hand };

type Deal = (Deck) => [Card, Deck];

type PickupCard = (Hand, Card) => Hand;

// ----------------

const deal: Deal = (deck: Deck): [Card, Deck] => [_.head(deck), _.tail(deck)];
const pickup: PickupCard = (hand: Hand, card: Card): Hand => [...hand, card];

const enumValues = e => _.values(e).filter(v => typeof v === "number");

let deck: Deck = enumValues(Suit).reduce((deck, suit: Suit) => {
    return deck.concat(
        enumValues(Rank).map(rank => [suit, rank])
    );
}, []) as Deck;

deck = _.shuffle(deck);

const players: Player[] = [
    { name: 'Testy McTesterson', hand: [] },
    { name: 'Boaty McBoatface', hand: [] }
];

_.range(5).map(_ => {
    let card;
    players.map((player) => {
        [card, deck] = deal(deck);
        player.hand = pickup(player.hand, card);
    });
});

players.map(player => {
    console.log('Player: ', player.name)
    player.hand.map(card => {
        const [suit, rank] = card;
        console.log(`   Card: ${Rank[rank]} of ${Suit[suit]}s`);
    })
});

console.log(`Cards in deck: ${deck.length}`);
