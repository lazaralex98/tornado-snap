wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  switch (requestObject.method) {
    case 'hello':
      console.log('hello world');
      return 'world!';

    default:
      throw new Error('Method not found.');
  }
});
