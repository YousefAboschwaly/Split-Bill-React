import { useState, useEffect } from "react";

import "./App.css";
import FriendList from "./Components/FriendList/FriendList";
import Button from "./Components/Button/Button";
import FormAddFriend from "./Components/FormAddFriend/Form-Add-Friend";
import FormSplitBill from "./Components/FormSplitBill/FormSplitBill";

function App() {
  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];

  // Safely retrieve friends from localStorage, with fallback to initialFriends
  const [friends, setFriends] = useState(() => {
    try {
      const storedFriends = localStorage.getItem("friends");
      return storedFriends ? JSON.parse(storedFriends) : initialFriends;
    } catch (error) {
      console.error("Failed to parse friends from localStorage", error);
      return initialFriends; // fallback to initialFriends in case of error
    }
  });

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);

  // Store updated friends in localStorage
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelect(friend) {
    setSelectedFriend((curSelectedFriend) =>
      curSelectedFriend?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          handleSelect={handleSelect}
        />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

export default App;
