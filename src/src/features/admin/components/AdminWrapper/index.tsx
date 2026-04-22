import type { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
};

export const AdminWrapper = ({ children }: Props) => {
  return (
    <div>
      <div className="bg-[#f4f4f4] min-h-screen relative w-full overflow-hidden">
        <div className="ml-[250px] lg:ml-[250px] md:ml-[250px] sm:ml-[200px] pt-[80px] min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};
