import { clearData, fetchData, storeData } from "../utils";

const Form = ({
  note,
  storedNote,
  setNote,
  setStoredNote,
}: {
  note: string;
  storedNote: string;
  setNote: Function;
  setStoredNote: Function;
}) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Home
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This dapp/snap allows you to save your tornado cash note within
              MetaMask flask. Please note that this is not encrypted.
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Tornado Cash Note
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="tornadoCashNote"
                  name="tornadoCashNote"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Your current stored not is{" "}
                  <span className="font-bold italic">"{storedNote}"</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={async () => {
              // @ts-ignore
              const { ethereum } = window;
              const storedData = await clearData(ethereum);
              console.log("cleared data", storedData);
              setStoredNote("");
            }}
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear Note
          </button>
          <button
            onClick={async () => {
              // @ts-ignore
              const { ethereum } = window;
              const storedData = await storeData(ethereum, note);
              console.log("stored data", storedData);
              setStoredNote(storedData.tornadoNote);
            }}
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Note
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
