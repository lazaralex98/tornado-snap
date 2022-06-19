import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

/**
 * # Utility Functions
 * a few utility functions that I couldn't export/import because
 * of build issues.
 *
 * # RPC Message Handler
 * the main part of the codebase where rpc messages are handled
 */

// ==============================================================
// Utility Functions
// ==============================================================

/**
 * TODO: As is this method is useless. I need to learn how to
 * transform the above buffers into a public adress and a
 * private keys for ETH.
 */
const getExtendedKeys = async (coinType: number) => {
  // get node
  const ethNode: any = await wallet.request({
    method: `snap_getBip44Entropy_${coinType}`,
  });
  if (!ethNode) {
    throw new Error('No ETH node');
  }

  // derive extended keys
  const deriveETHAddress = getBIP44AddressKeyDeriver(ethNode);
  const addressKey0 = deriveETHAddress(0);
  const addressKey1 = deriveETHAddress(1);

  return { addressKey0, addressKey1 };
};

/**
 *
 * @returns the data as stored
 */
const fetchData = async (): Promise<Record<string, unknown>> => {
  // fetch data
  const storedData = await wallet.request<null | Record<string, unknown>>({
    method: 'snap_manageState',
    params: ['get'],
  });
  if (!storedData) {
    throw new Error(`No data stored`);
  }
  return storedData;
};

/**
 *
 * @notice do not store sensitive data
 * @param toStore object to store in state
 * @returns the data as stored
 */
const storeData = async (
  toStore: Record<string, unknown>,
): Promise<Record<string, unknown>> => {
  // store data
  await wallet.request({
    method: 'snap_manageState',
    params: ['update', toStore],
  });

  return await fetchData();
};

/**
 * @description function to clear the stored data
 */
export const clearData = async (): Promise<void> => {
  await wallet.request({
    method: 'snap_manageState',
    params: ['clear'],
  });
};

// ==============================================================
// RPC Message Handler
// ==============================================================

wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  switch (requestObject.method) {
    case 'storeData': {
      // mock tornado note
      const tornadoNote =
        'tornado-eth-0.1-5-abc123abc123abc123abc123abc123abc123';

      const snapConfirm = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Want to store your TornadoCash note?',
            description:
              'We are storing the TornadoCashs note in MetaMask as you have inputed it.',
            textAreaContent:
              'If you confirm this, the string that represents your TornadoCash will be store in MetaMask for you to use later.',
          },
        ],
      });
      if (snapConfirm !== true) {
        throw new Error("User didn't confirmed");
      }

      return await storeData({ tornadoNote });
    }

    case 'fetchData': {
      return await fetchData();
    }

    case 'clearData': {
      await clearData();
      return true;
    }

    default: {
      throw new Error('Method not found.');
    }
  }
});
