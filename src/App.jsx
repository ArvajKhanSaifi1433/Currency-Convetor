import React, { useState } from "react";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";
import { InputBox } from "./Components/index";
import useLocaleStorage from "./Hooks/useLocaleStorage";

function App() {
  const [from, setFrom] = useLocaleStorage("from", "usd");

  const [to, setTo] = useLocaleStorage("to", "inr");
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const [amount, setAmount] = useLocaleStorage("amount", 0);
  const [convertAmount, setConvertAmount] = useLocaleStorage(
    "convertAmount",
    0
  );
  function convert() {
    setConvertAmount(amount * currencyInfo[to]);
  }
  function swap() {
    setFrom(to);
    setTo(from);
    setAmount(convertAmount);
    setConvertAmount(amount);
  }
  return (
    <>
      <h1 className="absolute top-3 left-1/2 -translate-x-1/2 text-red-500 font-extrabold text-3xl animate-pulse duration-1000">
        Arvaj Saifi
      </h1>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  optionsValue={options}
                  value={from}
                  amount={amount}
                  onAmountChanger={(amount) => setAmount(amount)}
                  onCurrencyChanger={(currency) => setFrom(currency)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  onClick={swap}
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertAmount}
                  optionsValue={options}
                  value={to}
                  onCurrencyChanger={(currency) => setTo(currency)}
                  amountDisable
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {`${from.toUpperCase()} to ${to.toUpperCase()}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
