"use client";
import type { ReactNode } from "react";

export type IconName =
  | "sparkle"
  | "image"
  | "arrow"
  | "copy"
  | "check"
  | "chevron"
  | "wand"
  | "facebook"
  | "instagram"
  | "google"
  | "mail"
  | "dots"
  | "heart"
  | "comment"
  | "send"
  | "bookmark"
  | "more";

export default function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, ReactNode> = {
    sparkle: (
      <>
        <path
          {...shared}
          d="m12 3-1.1 4.3L7 8.5l3.9 1.2L12 14l1.1-4.3L17 8.5l-3.9-1.2L12 3Z"
        />
        <path
          {...shared}
          d="m5 14-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"
        />
        <path
          {...shared}
          d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7L19 14Z"
        />
      </>
    ),
    image: (
      <>
        <rect {...shared} x="3" y="4" width="18" height="16" rx="2" />
        <circle {...shared} cx="8.5" cy="9" r="1.5" />
        <path {...shared} d="m21 15-4.8-4.8a1.8 1.8 0 0 0-2.5 0L5 19" />
      </>
    ),
    arrow: (
      <>
        <path {...shared} d="M5 12h14" />
        <path {...shared} d="m13 6 6 6-6 6" />
      </>
    ),
    copy: (
      <>
        <rect {...shared} x="8" y="8" width="11" height="11" rx="2" />
        <path
          {...shared}
          d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
        />
      </>
    ),
    check: <path {...shared} d="m5 12 4.2 4L19 6.5" />,
    chevron: <path {...shared} d="m6 9 6 6 6-6" />,
    wand: (
      <>
        <path {...shared} d="m4 20 12-12" />
        <path {...shared} d="m14 5 1-2 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z" />
        <path
          {...shared}
          d="m19 12 .7-1.3L21 10l-1.3-.7L19 8l-.7 1.3L17 10l1.3.7L19 12Z"
        />
      </>
    ),
    facebook: (
      <path
        fill="currentColor"
        d="M13.7 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.2H8v3.1h2.5v8h3.2Z"
      />
    ),
    instagram: (
      <>
        <defs>
          <linearGradient
            id="instagramGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FFD600" />
            <stop offset="45%" stopColor="#FF0069" />
            <stop offset="100%" stopColor="#7638FA" />
          </linearGradient>
        </defs>

        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          fill="url(#instagramGradient)"
          stroke="none"
        />

        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />

        <circle cx="17.7" cy="6.5" r="1" fill="white" />
      </>
    ),
    google: (
      <path
        fill="currentColor"
        d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4a4.6 4.6 0 0 1-2 3v2.4h3.2c1.9-1.8 3-4.3 3-7.1ZM12 22c2.7 0 5-.9 6.6-2.6l-3.2-2.4c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3.1v2.5A10 10 0 0 0 12 22Zm-5.6-8.2a6 6 0 0 1 0-3.7V7.6H3.1a10 10 0 0 0 0 8.7l3.3-2.5ZM12 6.1c1.5 0 2.8.5 3.8 1.5l2.8-2.8A9.8 9.8 0 0 0 3.1 7.6l3.3 2.5C7.2 7.8 9.4 6.1 12 6.1Z"
      />
    ),
    mail: (
      <>
        <rect {...shared} x="3" y="5" width="18" height="14" rx="2" />
        <path {...shared} d="m3 7 9 6 9-6" />
      </>
    ),
    dots: (
      <>
        <circle fill="currentColor" cx="5" cy="12" r="1.5" />
        <circle fill="currentColor" cx="12" cy="12" r="1.5" />
        <circle fill="currentColor" cx="19" cy="12" r="1.5" />
      </>
    ),
    heart: (
      <>
        <path
          {...shared}
          d="M20.8 4.6c-2.1-2.1-5.5-2.1-7.6 0L12 5.8l-1.2-1.2c-2.1-2.1-5.5-2.1-7.6 0s-2.1 5.5 0 7.6l1.2 1.2L12 21l7.6-7.6 1.2-1.2c2.1-2.1 2.1-5.5 0-7.6Z"
        />
      </>
    ),
    comment: (
      <>
        <path
          {...shared}
          d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5c-1.5 0-2.9-.4-4.1-1.1L3 20l1.1-4.9A8.3 8.3 0 0 1 3 11.5C3 6.8 6.8 3 12 3s9 3.8 9 8.5Z"
        />
      </>
    ),
    send: (
      <>
        <path {...shared} d="m22 2-7 20-4-9-9-4 20-7Z" />
        <path {...shared} d="M22 2 11 13" />
      </>
    ),
    bookmark: (
      <>
        <path {...shared} d="M6 3h12v18l-6-4-6 4V3Z" />
      </>
    ),
    more: (
      <>
        <circle {...shared} cx="12" cy="5" r="1.5" />
        <circle {...shared} cx="12" cy="12" r="1.5" />
        <circle {...shared} cx="12" cy="19" r="1.5" />
      </>
    ),
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>{paths[name]}</svg>;
}