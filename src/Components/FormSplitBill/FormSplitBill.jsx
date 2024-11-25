import React, { useState } from "react";
import Button from "../Button/Button";

export default function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPayed, setWhoIsPayed] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    handleSplitBill(whoIsPayed === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <>
      <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
        <h2>Split a bill with {selectedFriend.name}</h2>

        <label htmlFor="bill">💰 Bill value</label>
        <input
          type="text"
          id="bill"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />

        <label htmlFor="your-expense">🧍‍♀️ Your expense</label>
        <input
          type="text"
          id="your-expense"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill
                ? paidByUser
                : Number(e.target.value)
            )
          }
        />

        <label htmlFor="friend-expense">👫 {selectedFriend.name} expense</label>
        <input type="text" id="friend-expense" disabled value={paidByFriend} />
        <label htmlFor="pay">🤑 Who is paying the bill</label>
        <select
          name="who is paying?"
          id="pay"
          value={whoIsPayed}
          onChange={(e) => setWhoIsPayed(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Split bill</Button>
      </form>
    </>
  );
}
