import type { ReactNode } from "react";

type Props = {
	children: ReactNode | ReactNode[];
};

export const AuthWrapper = ({ children }: Props) => {
	return (
		<div className="min-h-screen bg-white flex flex-col lg:flex-row font-['Inter']">
			<div className="flex-1 h-screen overflow-y-auto flex flex-col px-8 2xl:px-[100px] py-10 md:py-20 relative">
				<div className="mb-20"></div>
				<div className="max-w-[425px] w-full mx-auto my-auto">{children}</div>
			</div>
		</div>
	);
};
