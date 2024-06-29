import type { ReactElement } from "react";
import Link from "../../modules/quisi/link.jsx";
import mapUrlToHref from "../../utils/map-url-to-href.js";
import formatLineColumnNumbers from "./format-line-column-numbers.js";

interface Props {
  readonly children: string;
  readonly columnNumber: number | null;
  readonly lineNumber: number | null;
}

export default function ContentSecurityPolicySourceFile({
  children,
  columnNumber,
  lineNumber,
}: Props): ReactElement {
  const href: string | null = mapUrlToHref(children);
  const lineColumn: string | null = formatLineColumnNumbers(
    lineNumber,
    columnNumber,
  );

  if (href === null) {
    return <code>{children}{lineColumn}</code>;
  }

  return (
    <Link
      feature="content-security-policy"
      follow={false}
      href={href}
      title=""
    >
      {children}{lineColumn}
    </Link>
  );
}
