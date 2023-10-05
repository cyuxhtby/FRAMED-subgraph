import { Address } from "@graphprotocol/graph-ts";
import {
  JoinGame as JoinGameEvent,
  InitGame as InitGameEvent,
  Action as ActionEvent,
  CastVote as CastVoteEvent,
  Exiled as ExiledEvent,
  CheckMafia as CheckMafiaEvent,
  Killed as KilledEvent,
  NewState as NewStateEvent,
} from "../generated/Mafia/Mafia";
import {
  // JoinGame,
  Player,
  Game,
  // Action,
  // Vote,
  // Exile,
  // Investigation
} from "../generated/schema";

export function handleJoinGame(event: JoinGameEvent): void {
  let gameRoom = new Game("id-placeholder");
  // gameRoom.set(pla)
  let p = ["a", "b"];
  gameRoom.players = p;
  // entity.playerAddress = event.params._playerAddress;
  // entity.blockNumber = event.block.number;
  // entity.blockTimestamp = event.block.timestamp;
  // // entity.transactionHash = event.transaction.hash;

  // if (event.params._playerId != null) {
  //   gameRoom.playerId = event.params._playerId;
  // }

  gameRoom.save();
}

// export function handleInitGame(event: InitGameEvent): void {
//   let entity = new Game(event.params._gameCount.toString());
//   entity.gameCount = event.params._gameCount;
//   // Initialize other fields here
//   entity.save();
// }

// export function handleAction(event: ActionEvent): void {
//   let entity = new Action(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   );
//   entity.playerAddress = event.params._playerAddress;
//   entity.actionCount = event.params._actionCount;
//   entity.save();
// }

// export function handleCastVote(event: CastVoteEvent): void {
//   let entity = new Vote(event.transaction.hash.toHex() + "-" + event.logIndex.toString());

//   entity.voter = event.params._voter;
//   entity.playerId = event.params._playerId;
//   entity.save();
// }

// export function handleExiled(event: ExiledEvent): void {
//   let entity = new Exile(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   );
//   entity.playerExiled = event.params._playerExiled;
//   entity.save();
// }

// export function handleCheckMafia(event: CheckMafiaEvent): void {
//   let entity = new Investigation(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   );
//   entity.isCaught = event.params._mafiaKilled;
//   entity.save();
// }

// export function handleKilled(event: KilledEvent): void {
//   let entity = new Player(event.params._playerKilled.toString());
//   entity.playerId = event.params._playerKilled;
//   entity.alive = false;
//   entity.save();
// }

// export function handleNewState(event: NewStateEvent): void {
//   let entity = new Game(event.params.gameState.toString());
//   entity.gameState = event.params.gameState;
//   entity.save();
// }
