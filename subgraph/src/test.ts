import {
  JoinGame as JoinGameEvent,
  InitializeGame as InitializeGameEvent,
  Action as ActionEvent,
  Voted as VotedEvent
} from "../generated/Mafia/Mafia"
import {
  JoinGame,
  InitializeGame,
  Action,
  Voted
} from "../generated/schema"

export function handleJoinGame(event: JoinGameEvent): void {
  let entity = new JoinGame(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.playerAddress = event.params._playerAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitializeGame(event: InitializeGameEvent): void {
  let entity = new InitializeGame(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.gameCount = event.params._gameCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAction(event: ActionEvent): void {
  let entity = new Action(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.playerAddress = event.params._playerAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoted(event: VotedEvent): void {
  let entity = new Voted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.voter = event.params.voter
  entity.playerId = event.params.playerId
  entity.votes = event.params.votes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
