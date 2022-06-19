const SNAP_ID = `local:8000`;

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

export const storeData = async (ethereum: any) => {
  try {
    const response = await ethereum.request({
      method: "wallet_invokeSnap",
      params: [
        SNAP_ID,
        {
          method: "storeData",
        },
      ],
    });
    console.log(`happy that you stored this :)`);
    alert(`happy that you stored this :)`);
  } catch (err: any) {
    console.error(err);
    alert("Problem happened: " + err.message || err);
  }
};

export const fetchData = async (ethereum: any) => {
  try {
    const response = await ethereum.request({
      method: "wallet_invokeSnap",
      params: [
        SNAP_ID,
        {
          method: "fetchData",
        },
      ],
    });
    console.log("fetched this: ", response);
  } catch (err: any) {
    console.error(err);
    alert("Problem happened: " + err.message || err);
  }
};

export const clearData = async (ethereum: any) => {
  try {
    const response = await ethereum.request({
      method: "wallet_invokeSnap",
      params: [
        SNAP_ID,
        {
          method: "clearData",
        },
      ],
    });
    console.log("clear status", response);
  } catch (err: any) {
    console.error(err);
    alert("Problem happened: " + err.message || err);
  }
};
