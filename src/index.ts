import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  switch (requestObject.method) {
    case 'hello': {
      /**
       * it could be useful if wallet.request would have a more useful return type
       * altough I do see how that is problematic
       */
      const ethNode: any = await wallet.request({
        method: 'snap_getBip44Entropy_60',
      });
      if (!ethNode) {
        throw new Error('No ETH node');
      }

      const deriveETHAddress = getBIP44AddressKeyDeriver(ethNode);
      const _addressKey0 = deriveETHAddress(0);
      const _addressKey1 = deriveETHAddress(1);

      // Now, you should be able to ask the user to e.g. sign transactions, but we never get here because the above fails
      console.log('Hello');
      return 'hello';
    }

    default: {
      throw new Error('Method not found.');
    }
  }
});
