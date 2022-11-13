import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}

export const Container = (props: ContainerProps) => {
  return (
    <main className="h-full flex justify-center md:container md:mx-auto">
      <div className="h-full w-full max-w-sm">{props.children}</div>
    </main>
  );
};
