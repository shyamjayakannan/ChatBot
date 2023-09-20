"use client";
import classes from "../../styles/newChat.module.css";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { v4 } from "uuid";
import { useFetchUserPrevChatLink } from "../../hook/useFetchUserPrevChatLink";

const NewChat = ({ setConversationId, conversationId, setInitialRender }) => {
  const { isLoading, data: prevchat } = useFetchUserPrevChatLink([]);

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <div
          className={`${classes.item} ${
            "new" === conversationId.substr(0, 3) ? classes.active : ""
          }`}
          onClick={() => {
            if (conversationId.substr(0, 3) == "new") return;
            setConversationId("new" + v4());
            setInitialRender(true);
          }}
        >
          New
        </div>

        {isLoading ? (
          <LoadingSpinner
            minHeight={"30vh"}
            width={"40px"}
            height={"40px"}
            border={"4"}
          />
        ) : (
          <>
            {prevchat.map((item, index) => (
              <div
                key={index}
                id={item.id}
                className={`${classes.item} ${
                  item.id === conversationId ? classes.active : ""
                }`}
                onClick={(e) => {
                  setConversationId(e.target.getAttribute("id"));
                }}
              >
                {item.name}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NewChat;
