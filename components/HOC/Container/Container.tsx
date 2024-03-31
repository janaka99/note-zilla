import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classes?: string;
};

const Container = ({ children, classes }: Props) => {
  return (
    <div
      className={`w-full h-full max-w-screen-xl mx-auto px-8 md:px-10 lg:px-12 ${classes}`}
    >
      {children}
    </div>
  );
};

export default Container;
