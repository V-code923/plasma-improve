import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.5.4/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Test meditation session recording",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const user = accounts.get('wallet_1')!;
        const block = chain.mineBlock([
            Tx.contractCall('meditation-tracker', 'record-meditation-session', 
                [types.uint(30), types.uint(1), types.none()], 
                user.address
            )
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk();
    }
});

Clarinet.test({
    name: "Test meditation group creation",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const user = accounts.get('wallet_1')!;
        const block = chain.mineBlock([
            Tx.contractCall('meditation-tracker', 'create-meditation-group', 
                [types.utf8('Plasma Practitioners'), types.utf8('Global mindfulness network')], 
                user.address
            )
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk();
    }
});