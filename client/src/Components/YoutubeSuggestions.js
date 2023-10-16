import axios from "axios";
import React, { useEffect, useState } from "react";

const YoutubeSuggestions = ({ youtubeSuggestions }) => {
  console.log(youtubeSuggestions);
  return (
    <div className="p-2 bg-red-500 text-white border-2">
      {youtubeSuggestions.map((suggestion) => (
        <div key={suggestion.video_id} className="flex gap-2">
          <div>
            <img src={suggestion.thumbnail_url} alt={suggestion.title} />
          </div>
          <div>
            <h1>{suggestion.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YoutubeSuggestions;
