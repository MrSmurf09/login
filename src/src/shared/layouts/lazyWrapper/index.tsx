import { AnimatePresence } from "motion/react";
import { type ReactNode, Suspense } from "react";

export const LazyWrapper = ({ children }: { children: ReactNode }) => (
	<Suspense fallback={<div>Cargando ....</div>}>
		<AnimatePresence mode="wait">{children}</AnimatePresence>
	</Suspense>
);
