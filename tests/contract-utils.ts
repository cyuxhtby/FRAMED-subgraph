import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { InitGame } from "../generated/Contract/Contract"

export function createInitGameEvent(room: Address, roomId: BigInt): InitGame {
  let initGameEvent = changetype<InitGame>(newMockEvent())

  initGameEvent.parameters = new Array()

  initGameEvent.parameters.push(
    new ethereum.EventParam("room", ethereum.Value.fromAddress(room))
  )
  initGameEvent.parameters.push(
    new ethereum.EventParam("roomId", ethereum.Value.fromUnsignedBigInt(roomId))
  )

  return initGameEvent
}
