import Header from "@/components/common/Header/Header";
import { Editor } from "@/components/editor/Editor";
import React from "react";

const page = () => {
  return (
    <div>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">This is a fake document title.</p>
        </div>
      </Header>
      <Editor />
    </div>
  );
};

export default page;
