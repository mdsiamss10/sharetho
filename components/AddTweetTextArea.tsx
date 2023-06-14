"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

function AddTweetTextArea() {
  const [textareaValue, setTextareaValue] = useState("");
  const { data } = useSession();

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setTextareaValue(textarea.value);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (tweet: string) => {
      await axios.post("/api/tweets/addTweet", { tweet });
    },
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      },
      onSuccess: (_) => {
        toast.dismiss("creating");
        queryClient.invalidateQueries(["getTweets"]);
        toast.success("Shared at lighting speed!");
        setTextareaValue("");
      },
    }
  );

  const handleAddtweet = () => {
    if (textareaValue.length >= 5) {
      toast.loading("Fueling up our engine.🛠️", {
        toastId: "creating",
      });
      mutate(textareaValue);
      setTextareaValue("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-end w-full">
        <textarea
          className="outline-none bg-transparent resize-none text-xl w-full mt-2"
          placeholder="What's happening?"
          maxLength={280}
          minLength={5}
          value={textareaValue}
          onChange={handleTextareaChange}
          rows={1}
        />
        <button
          disabled={!textareaValue || textareaValue.length < 5 ? true : false}
          className="btn bg-sky-600 hover:bg-sky-600/70 rounded-full text-white mt-4 border-0 disabled:bg-sky-800 disabled:text-white/50"
          onClick={handleAddtweet}
        >
          Tweet
        </button>
      </div>
    </>
  );
}

export default AddTweetTextArea;
