import type { ReactNode } from "react";

/** Tags allowed inside message strings, e.g. "Que <mark>te escriban</mark> a ti". */
export const richTags = {
  mark: (chunks: ReactNode) => <span className="marker">{chunks}</span>,
  br: () => <br />,
};
