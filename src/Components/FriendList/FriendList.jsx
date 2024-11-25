import React from "react";
import Friend from "../Friend/Friend";

export default function FriendList({ friends, selectedFriend, handleSelect }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            selectedFriend={selectedFriend}
            handleSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
}
