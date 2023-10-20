import {
  JoinGame as JoinGameEvent,
  InitGame as InitGameEvent,
  Action as ActionEvent,
  CastVote as CastVoteEvent,
  Exiled as ExiledEvent,
  CheckMafia as CheckMafiaEvent,
  Killed as KilledEvent,
  NewState as NewStateEvent,
  Voted as VotedEvent,
  MafiaWin as MafiaWinEvent,
  Mafia,
} from "../generated/templates/Mafia/Mafia";
import {
  // JoinGame,
  Player,
  Game,
  PlayerGame,
  // Vote,
  // Exile,
  // Investigation
} from "../generated/schema";

export function handleJoinGame(event: JoinGameEvent): void {
  let player = Player.load(event.transaction.from.toHexString());
  let gameRoom = Game.load(event.address.toHexString());
  let contract = Mafia.bind(event.address);
  let playersArray = contract.getPlayersArray();

  if (gameRoom) {
    if (player) {
      let playerGameId = player.id
        .concat("-")
        .concat(gameRoom.roomId.toString());
      let playerGame = new PlayerGame(playerGameId);
      playerGame.player = player.id;
      playerGame.game = gameRoom.id;
      playerGame.position = playersArray.length - 1;
      playerGame.action = false;
      playerGame.alive = true;
      playerGame.vote = false;
      playerGame.save();
    } else {
      player = new Player(event.transaction.from.toHexString());
      let playerGameId = player.id
        .concat("-")
        .concat(gameRoom.roomId.toString());
      let playerGame = new PlayerGame(playerGameId);
      playerGame.player = player.id;
      playerGame.game = gameRoom.id;
      playerGame.position = playersArray.length - 1;
      playerGame.action = false;
      playerGame.alive = true;
      playerGame.vote = false;
      playerGame.save();
      player.save();
    }
  }
}

export function handleInitGame(event: InitGameEvent): void {
  let gameRoom = Game.load(event.address.toHexString());

  if (gameRoom) {
    gameRoom.phase = 1;
    gameRoom.save();
  }
}

export function handleAction(event: ActionEvent): void {
  let gameRoom = Game.load(event.address.toHexString());
  let player = Player.load(event.params._playerAddress.toHexString());

  if (gameRoom && player) {
    let playerGameId = player.id.concat("-").concat(gameRoom.roomId.toString());
    let playerGame = PlayerGame.load(playerGameId);
    if (playerGame) {
      playerGame.action = true;
      gameRoom.actionCount++;
      if (gameRoom.actionCount == gameRoom.size) {
        gameRoom.phase = 2;
      }
      playerGame.save();
    }
    gameRoom.save();
  }
}
export function handleVote(event: VotedEvent): void {
  let gameRoom = Game.load(event.address.toHexString());
  let player = Player.load(event.params.voter.toHexString());

  if (gameRoom && player) {
    let playerGameId = player.id.concat("-").concat(gameRoom.roomId.toString());
    let playerGame = PlayerGame.load(playerGameId);
    if (playerGame) {
      playerGame.vote = true;
      gameRoom.voteCount++;
      if (gameRoom.voteCount == gameRoom.size) {
        gameRoom.phase = 3;
      }
      playerGame.save();
    }
    gameRoom.save();
  }
}

export function handleCheckMafia(event: CheckMafiaEvent): void {
  let gameRoom = Game.load(event.address.toHexString());

  if (gameRoom) {
    if (event.params._mafiaKilled) {
      gameRoom.phase = 4;
    } else {
      gameRoom.phase = 1;

      gameRoom.voteCount = 0;
      gameRoom.actionCount = 0;
      let contract = Mafia.bind(event.address);
      let playersArray = contract.getPlayersArray();
      for (let i = 0; i < playersArray.length; i++) {
        let playerId = playersArray[i];
        let playerGameId = playerId
          .toHexString()
          .concat("-")
          .concat(gameRoom.roomId.toString());
        let playerGame = PlayerGame.load(playerGameId);
        if (playerGame) {
          playerGame.vote = false;
          playerGame.action = false;
          playerGame.save();
        }
      }
    }
    gameRoom.save();
  }
}

export function handleKilled(event: KilledEvent): void {
  let gameRoom = Game.load(event.address.toHexString());
  let player = Player.load(event.params._playerAddress.toHexString());

  if (gameRoom && player) {
    let playerGameId = player.id.concat("-").concat(gameRoom.roomId.toString());
    let playerGame = PlayerGame.load(playerGameId);
    if (playerGame) {
      playerGame.alive = false;
      gameRoom.size--;
      playerGame.action = false;
      playerGame.vote = false;
      playerGame.save();
    }
    gameRoom.save();
  }
}

export function handleMafiaWin(event: MafiaWinEvent): void {
  let gameRoom = Game.load(event.address.toHexString());

  if (gameRoom) {
    gameRoom.winner = 1;
    gameRoom.phase = 4;
    gameRoom.save();
  }
}
