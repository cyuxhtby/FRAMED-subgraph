import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { InitGame } from "../generated/schema"
import { InitGame as InitGameEvent } from "../generated/Contract/Contract"
import { handleInitGame } from "../src/contract"
import { createInitGameEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let room = Address.fromString("0x0000000000000000000000000000000000000001")
    let roomId = BigInt.fromI32(234)
    let newInitGameEvent = createInitGameEvent(room, roomId)
    handleInitGame(newInitGameEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("InitGame created and stored", () => {
    assert.entityCount("InitGame", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "InitGame",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "room",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "InitGame",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "roomId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
