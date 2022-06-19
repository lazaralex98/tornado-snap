const SNAP_ID = `local:http://localhost:8000/`;

export const connect = async (ethereum: any) => {
  await ethereum.request({
    method: "wallet_enable",
    params: [
      {
        wallet_snap: { [SNAP_ID]: {} },
      },
    ],
  });
};

export const storeData = async (ethereum: any, tornadoNote: string) => {
  return await ethereum.request({
    method: "wallet_invokeSnap",
    params: [
      SNAP_ID,
      {
        method: "storeData",
        tornadoNote,
      },
    ],
  });
};

export const fetchData = async (ethereum: any) => {
  return await ethereum.request({
    method: "wallet_invokeSnap",
    params: [
      SNAP_ID,
      {
        method: "fetchData",
      },
    ],
  });
};

export const clearData = async (ethereum: any) => {
  return await ethereum.request({
    method: "wallet_invokeSnap",
    params: [
      SNAP_ID,
      {
        method: "clearData",
      },
    ],
  });
};
