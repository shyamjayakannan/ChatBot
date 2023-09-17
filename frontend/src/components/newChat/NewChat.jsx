"use client";
import classes from "../../styles/newChat.module.css";
import Link from "next/link";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { usePathname } from "next/navigation";
import { useFetchUserPrevChatLink } from "../../hook/useFetchUserPrevChatLink";

const NewChat = () => {
  const pathname = usePathname();
  const { isLoading, data: prevchat } = useFetchUserPrevChatLink([]);
  const pageId = pathname.substring(6);

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <div
          className={`${classes.item} ${"" === pageId ? classes.active : ""}`}
        >
          <Link href={`/`}>New</Link>
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
              <Link href={`/chat/${item.id}`} key={index}>
                <div
                  key={index}
                  className={`${classes.item} ${
                    item.id === pageId ? classes.active : ""
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NewChat;
