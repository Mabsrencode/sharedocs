"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../common/Loader/Loader";
import Header from "../common/Header/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "../editor/Editor";
import ActiveCollaborators from "../ActiveCollaborators/ActiveCollaborators";
import { Input } from "../ui/input";
import Image from "next/image";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: CollaborativeRoomProps) => {
  const currentUserType = "editor";
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "enter") {
      setLoading(true);
      try {
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader bigger />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <div
                ref={containerRef}
                className="flex w-fit items-center justify-center gap-2"
              >
                {editing && !loading ? (
                  <div className="grid">
                    <label htmlFor="document-title" className="text-xs">
                      Document Title
                    </label>
                    <input
                      id="document-title"
                      type="text"
                      value={documentTitle}
                      ref={inputRef}
                      placeholder="Enter title"
                      onChange={(e) => setDocumentTitle(e.target.value)}
                      onKeyDown={updateTitleHandler}
                      disabled={!editing}
                      className="py-0 text-sm bg-transparent outline-none focus:border-b border-white mt-2 py-2"
                    />
                  </div>
                ) : (
                  <div className="border-r-2 pr-2">
                    <p className="text-sm">{documentTitle}</p>
                  </div>
                )}
                {currentUserType === "editor" && !editing && (
                  <Image
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                    onClick={() => setEditing(true)}
                    className="cursor-pointer"
                  />
                )}
                {currentUserType !== "editor" && !editing && (
                  <p className="view-only-tag">View only</p>
                )}
                {loading && <Loader bigger={false} />}
              </div>
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
