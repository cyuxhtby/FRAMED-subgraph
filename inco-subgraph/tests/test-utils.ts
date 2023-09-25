import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  OwnershipTransferred,
  RequestedTokens,
  Transfer
} from "../generated/Test/Test"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRequestedTokensEvent(
  amountInNativeCurrency: BigInt,
  usdEquivalent: BigInt,
  careTokenAmount: BigInt,
  nativeCurrency: i32,
  recipient: Address
): RequestedTokens {
  let requestedTokensEvent = changetype<RequestedTokens>(newMockEvent())

  requestedTokensEvent.parameters = new Array()

  requestedTokensEvent.parameters.push(
    new ethereum.EventParam(
      "amountInNativeCurrency",
      ethereum.Value.fromUnsignedBigInt(amountInNativeCurrency)
    )
  )
  requestedTokensEvent.parameters.push(
    new ethereum.EventParam(
      "usdEquivalent",
      ethereum.Value.fromUnsignedBigInt(usdEquivalent)
    )
  )
  requestedTokensEvent.parameters.push(
    new ethereum.EventParam(
      "careTokenAmount",
      ethereum.Value.fromUnsignedBigInt(careTokenAmount)
    )
  )
  requestedTokensEvent.parameters.push(
    new ethereum.EventParam(
      "nativeCurrency",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(nativeCurrency))
    )
  )
  requestedTokensEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )

  return requestedTokensEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
