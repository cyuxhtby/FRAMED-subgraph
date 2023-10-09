import { DataSourceContext } from "@graphprotocol/graph-ts";
import { InitGame as InitGameEvent } from "../generated/Contract/Contract";
import { Mafia } from "../generated/templates";
import {
  // JoinGame,
  Player,
  Game,
  // Action,
  // Vote,
  // Exile,
  // Investigation
} from "../generated/schema";

export function handleInitGame(event: InitGameEvent): void {
  // let context = new DataSourceContext();
  // context.setBigInt("roomId", event.params.roomId);
  Mafia.create(event.params.room);
  let gameRoom = new Game(event.params.room.toHexString());
  gameRoom.state = "created";
  gameRoom.creator = event.transaction.from.toHexString();
  gameRoom.roomId = event.params.roomId.toI32();
  gameRoom.save();
}
