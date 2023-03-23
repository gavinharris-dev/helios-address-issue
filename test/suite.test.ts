import { describe, expect, test } from 'vitest';
import {
  Address,
  Program,
  Datum as HeliosDatum,
} from '@hyperionbt/helios';

describe('Convert address from Datum back into an Address Object', () => {
  test.only('Expect address to be same after conversion', () => {
    const TEST_PROG = `
    spending test

    struct Datum {
      addr: Address
    }

    func main(_, _, _) -> Bool {
      true
    }
    `;

    const program = Program.new(TEST_PROG);

    const { Datum } = program.types;

    const addr =
      'addr_test1qrgqd6mhs05vjvtqk2at9pau3fhsd857dyxds27qk54gcvtnpkq9k63v7eue3u8u6pcvuzmwsk2hl46ceu9wxjxjvh4sj4drgd';

    const a = Address.fromBech32(addr);

    const datum = new Datum(a);

    const inline = HeliosDatum.inline(datum);
    //          ^?

    const uplcData = inline.data;

    const addrFromUplcData = Address.fromUplcData(uplcData);
    const addrFromUplcData2 = Address.fromUplcCbor(uplcData.toCbor());

    expect(addrFromUplcData.toBech32() === addr).toBeTruthy();
    expect(addrFromUplcData2.toBech32() === addr).toBeTruthy();
  });
});
