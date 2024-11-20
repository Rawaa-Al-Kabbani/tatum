import { Ethereum, Network, TatumSDK } from "@tatumio/tatum";
import React, { useState } from "react";

const TATUM_API_KEY = import.meta.env.VITE_TATUM_API_KEY;

export function AddressForm() {
  const [addressInput, setAddressInput] = useState<string>("");
  const [balanceValue, setBalanceValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onChangeAddress = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      setAddressInput(e.target.value);
    }
  };

  const getBalance = async () => {
    setBalanceValue("");
    setErrorMessage("");
    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM,
        apiKey: { v4: TATUM_API_KEY },
        verbose: true,
      });
      const balance = await tatum.address.getBalance({
        addresses: [addressInput],
      });
      if (balance.error) {
        const errorMessages = balance.error.message
          ? balance.error.message?.join("; ")
          : undefined;
        setErrorMessage(errorMessages ?? balance.error.code);
      } else if (balance.data) {
        const balanceData = balance.data.filter(
          (asset) => asset.asset === "ETH",
        )[0];
        setBalanceValue(balanceData.balance);
      } else {
        setErrorMessage("Unknown error occured!");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setBalanceValue;
  };

  return (
    <div>
      <p>
        <input
          type="text"
          value={addressInput}
          onChange={onChangeAddress}
          placeholder="Enter ETH wallet address to get balance"
          style={{ padding: "5px", width: "320px" }}
          data-testid="address_input"
        />
      </p>
      <button
        onClick={getBalance}
        style={{ padding: "5px" }}
        data-testid="submit_address"
      >
        Click Me
      </button>
      {balanceValue && (
        <p
          style={{ padding: "5px", fontSize: "16px", fontWeight: "bold" }}
          data-testid="balance_value"
        >
          Balance: {balanceValue}
        </p>
      )}

      {errorMessage && (
        <p
          style={{
            padding: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "red",
          }}
          data-testid="error_message"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default AddressForm;
