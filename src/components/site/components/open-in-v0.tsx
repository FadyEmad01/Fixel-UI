import Link from "next/link";

interface OpenInV0Props {
  /** The registry item name, e.g. "footer-01" */
  registryUrl: string;
  className?: string;
}

/**
 * "Open in v0" button — opens the component directly in v0.dev for editing.
 * Uses the official v0 deep-link API: https://v0.dev/chat/api/open?url=<registry-url>
 */
export function OpenInV0({ registryUrl, className }: OpenInV0Props) {
  const href = `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5",
        "text-xs font-medium text-muted-foreground",
        "hover:bg-muted hover:text-foreground transition-colors",
        className ?? "",
      ].join(" ")}
    >
      {/* v0 logo mark */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 40 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V13.0052C39.9136 16.8683 36.7819 20 32.9188 20H23.3919C19.5288 20 16.3972 16.8683 16.3972 13.0052V6.99475C16.3972 3.13165 19.5288 0 23.3919 0ZM19.9061 7.63707C19.9061 6.44946 20.8741 5.48145 22.0617 5.48145H28.2083C29.3959 5.48145 30.3639 6.44946 30.3639 7.63707C30.3639 8.82468 29.3959 9.79269 28.2083 9.79269H25.1417L36.0934 17.0547C35.4208 17.8999 34.3955 18.4414 33.2489 18.4414H22.0617C20.8741 18.4414 19.9061 17.4734 19.9061 16.2858C19.9061 15.0982 20.8741 14.1302 22.0617 14.1302H24.8961L14 6.99475C14.6726 6.14955 15.6979 5.60803 16.8445 5.60803H19.9061V7.63707Z"
          fillRule="evenodd"
        />
        <path d="M0 6.99795C0 3.13281 3.13007 0 6.99219 0H11V6.55306C11 6.78705 10.8357 6.98498 10.6062 7.01892C10.4369 7.04408 10.2652 7.0694 10.0918 7.09465L10.0918 7.09466L10.0917 7.09467C9.24591 7.21501 8.38417 7.33699 7.55555 7.47874C6.96591 7.5806 6.43637 7.81693 5.91919 8.33407C5.04665 9.20661 5.04665 10.7934 5.91919 11.6659C6.89156 12.6382 8.0216 12.3697 9.02219 12.1369L9.02221 12.1369L9.0222 12.1368C9.38288 12.0528 9.7278 11.9715 10.0518 11.9537C10.3338 11.9384 10.6179 11.943 10.7439 11.9452C10.7842 11.9459 10.8187 11.9464 10.8451 11.9464C10.9309 11.9464 11 12.0155 11 12.1013V20H6.99219C3.13007 20 0 16.8672 0 13.0021V6.99795Z" />
      </svg>
      Open in v0
    </Link>
  );
}
