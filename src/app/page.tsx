"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Icon from "./components/icons";
import { InstagramPreview } from "./components/previews/InstagramPreview";
import { FacebookPreview } from "./components/previews/FacebookPreview";
import { GooglePreview } from "./components/previews/GooglePreview";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GeneratedContent } from "@/app/types/marketing";
import { useEffect } from "react";

const platformStyles = {
  instagram: {
    label: "Instagram",
    icon: <FaInstagram className="size-[18px] text-white" />,
    color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    meta: "Caption + hashtags",
  },
  facebook: {
    label: "Facebook",
    icon: <FaFacebookF className="size-[18px] text-white" />,
    color: "bg-[#1877F2]",
    meta: "Community post",
  },
  google: {
    label: "Google Business",
    icon: <FcGoogle className="size-[18px]" />,
    color: "bg-white border border-[#e5e6e2]",
    meta: "Local update",
  },
  // email: {
  //   label: "Email",
  //   icon: "mail" as IconName,
  //   color: "bg-[#e9f0ec] text-[#39765c]",
  //   meta: "Newsletter copy",
  // },
};

export default function Home() {
  const [error, setError] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("German");
  const [details, setDetails] = useState("");
  const [remaining, setRemaining] = useState<number>(10);
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);

  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
    });
  }, []);

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  async function handleGenerate() {
    setIsGenerating(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurant,
        description,
        details,
        image,
        language,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || "Failed to generate content");
      setIsGenerating(false);
      return;
    }

    setRemaining(result.remaining);

    setError("");
    setGeneratedContent(result.generatedCaption);
    setIsGenerating(false);
  }

  async function copyContent(key: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1500);
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#23302a]">
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="border-b border-[#e8e5dd] bg-[#fcfbf8]/95 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2.5"
            aria-label="Savor homepage"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#234d3f] text-[#f6c96a]">
              <Icon name="sparkle" className="size-5" />
            </span>
            <span className="font-serif text-[21px] font-semibold tracking-[-0.04em] text-[#1e3029]">
              Dishboost
            </span>
          </a>

          {/* Account / profile button */}
          <button
            className="flex size-9 items-center justify-center rounded-full border border-[#e2e2dc] bg-white text-[#516059]"
            aria-label="Open account menu"
          >
            <span className="text-sm font-semibold">JD</span>
          </button>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-11 sm:px-8 lg:pt-16">
        {/* Hero headline and introduction */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e6dfd0] bg-[#f8f3e9] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6b2f]">
            <span className="size-1.5 rounded-full bg-[#cf9e45]" /> Your
            marketing prep, simplified
          </p>

          <h1 className="font-serif text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-[#1e3029] sm:text-5xl lg:text-[58px]">
            Make your next post
            <br className="hidden sm:block" /> the easiest part of service.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#68736d] sm:text-base">
            Turn one great food photo into thoughtful, on-brand marketing for
            every channel — ready in a few clicks.
          </p>
        </div>

        {/* ================= MAIN GENERATOR AREA ================= */}
        <div
          id="generator"
          className="mt-11 grid gap-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(500px,1.18fr)] lg:items-start"
        >
          {/* ================= LEFT COLUMN: INPUT FORM ================= */}
          <section className="rounded-[24px] border border-[#e5e3dc] bg-white p-5 shadow-[0_2px_2px_rgba(26,39,33,0.02),0_14px_35px_rgba(26,39,33,0.045)] sm:p-7">
            {/* Form title */}
            <div className="flex items-start justify-between border-b border-[#eeece7] pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a27735]">
                  New creation
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.035em] text-[#20312a]">
                  What are we sharing?
                </h2>
              </div>

              <span className="flex size-9 items-center justify-center rounded-full bg-[#f4f0e7] text-[#9f783b]">
                <Icon name="wand" className="size-4" />
              </span>
            </div>

            {/* Input fields */}
            <div className="mt-6 space-y-5">
              {/* Restaurant name */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#304038]">
                  Restaurant name
                </span>

                <input
                  value={restaurant}
                  onChange={(e) => setRestaurant(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#deded8] bg-[#fffefd] px-3.5 text-[15px] outline-none transition placeholder:text-[#a4aaa5] focus:border-[#789484] focus:ring-4 focus:ring-[#edf3ef]"
                  placeholder="e.g. Luna Osteria"
                />
              </label>

              {/* Restaurant description */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#304038]">
                  A little bit about your place
                </span>

                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#deded8] bg-[#fffefd] px-3.5 text-[15px] outline-none transition placeholder:text-[#a4aaa5] focus:border-[#789484] focus:ring-4 focus:ring-[#edf3ef]"
                  placeholder="Your cuisine, neighborhood, or vibe"
                />
              </label>

              {/* Promotion / event details */}
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#304038]">
                  Promotion or event details{" "}
                  <span className="font-normal text-[#9ba39e]">(optional)</span>
                </span>

                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-[#deded8] bg-[#fffefd] px-3.5 py-3 text-[15px] leading-6 outline-none transition placeholder:text-[#a4aaa5] focus:border-[#789484] focus:ring-4 focus:ring-[#edf3ef]"
                  placeholder="e.g. Happy hour, new menu, live music Friday"
                />
              </label>
              {/* Content language */}
              <div className="flex items-center justify-start gap-2 text-sm text-[#8c9690]">
                <span>Create posts in:</span>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="cursor-pointer bg-transparent font-semibold text-[#304038] outline-none"
                >
                  <option value="German">German</option>
                  <option value="English">English</option>
                </select>
              </div>
              {/* ================= IMAGE UPLOAD ================= */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#304038]">
                    Add a food photo ( optional )
                  </span>

                  <span className="text-xs text-[#8c9690]">
                    JPG, PNG · up to 10 MB
                  </span>
                </div>

                {/* Upload area / image preview */}
                <label className="group relative flex min-h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#c8d1ca] bg-[#fafbf9] transition hover:border-[#6e8b7b] hover:bg-[#f6faf7]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="sr-only"
                  />

                  {image ? (
                    <>
                      {/* Uploaded image preview */}
                      <Image
                        src={image}
                        alt="Uploaded food picture"
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                      <div className="relative flex gap-2">
                        <span className="relative rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#315543] shadow-sm">
                          Replace photo
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage(null);
                          }}
                          className="cursor-pointer rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
                        >
                          Remove photo
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Empty upload state */
                    <span className="flex flex-col items-center text-center">
                      <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-[#e8f0eb] text-[#477461]">
                        <Icon name="image" className="size-5" />
                      </span>

                      <span className="text-sm font-semibold text-[#34453c]">
                        Drop a photo here or{" "}
                        <span className="text-[#42745d]">browse files</span>
                      </span>

                      <span className="mt-1 text-xs text-[#8c9690]">
                        The better the photo, the better the story.
                      </span>
                    </span>
                  )}
                </label>
              </div>

              {/* Generate content button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#234d3f] text-sm font-semibold text-white shadow-[0_7px_15px_rgba(35,77,63,0.18)] transition hover:bg-[#1c4034] disabled:cursor-wait disabled:opacity-80"
              >
                <Icon name="sparkle" className="size-4 text-[#f9cd74]" />

                {isGenerating
                  ? "Creating your content…"
                  : "Create marketing content"}

                <Icon name="arrow" className="size-4" />
              </button>

              <p className="mt-3 text-center text-xs text-[#8c9690]">
                {remaining} free generations remaining today
              </p>

              {error && (
                <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>
          </section>

          {/* ================= RIGHT COLUMN: GENERATED CONTENT ================= */}
          <section className="rounded-[24px] border border-[#e5e3dc] bg-[#f5f4f0] p-4 shadow-[0_2px_2px_rgba(26,39,33,0.02),0_14px_35px_rgba(26,39,33,0.04)] sm:p-5">
            {/* Generated content header */}
            <div className="mb-4 flex items-center justify-between px-1">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a8479]">
                  Ready to share
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.035em] text-[#20312a]">
                  Your content kit
                </h2>
              </div>

              {/* Platform filter button */}
              <button className="flex items-center gap-1 text-sm font-semibold text-[#56655e] transition hover:text-[#2d493b]">
                All platforms <Icon name="chevron" className="size-4" />
              </button>
            </div>

            {/* ================= GENERATED PLATFORM CARDS ================= */}
            {generatedContent ? (
              <div className="grid max-w-2xl gap-4">
                {(
                  Object.keys(platformStyles) as Array<
                    keyof typeof platformStyles
                  >
                ).map((key) => {
                  const platform = platformStyles[key];

                  return (
                    <article
                      key={key}
                      className="h-fit overflow-hidden rounded-2xl border border-[#e6e4df] bg-white"
                    >
                      {/* Platform header */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex size-9 items-center justify-center rounded-full ${platform.color}`}
                          >
                            {platform.icon}
                          </span>

                          <div>
                            <h3 className="text-sm font-bold text-[#263630]">
                              {platform.label}
                            </h3>
                            <p className="text-xs text-[#909891]">
                              {platform.meta}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            copyContent(
                              key,
                              key === "instagram"
                                ? generatedContent[key].caption
                                : key === "facebook"
                                  ? generatedContent[key].post
                                  : `${generatedContent[key].summary}\n\n${generatedContent[key].details}`,
                            )
                          }
                          className="flex h-8 items-center gap-1.5 rounded-lg border border-[#e5e6e2] px-2.5 text-xs font-semibold text-[#59665f]"
                        >
                          {copied === key ? (
                            <>
                              <Icon
                                name="check"
                                className="size-3.5 text-[#418060]"
                              />
                              Copied
                            </>
                          ) : (
                            <>
                              <Icon name="copy" className="size-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>

                      {/* Social preview */}
                      <div className="border-t border-[#f0efeb] p-4">
                        <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-[#eceae5] bg-white">
                          {key === "instagram" && (
                            <InstagramPreview
                              restaurant={restaurant}
                              description={description}
                              image={image}
                              caption={generatedContent[key].caption}
                              cta={generatedContent[key].cta}
                              hashtags={generatedContent[key].hashtags}
                            />
                          )}

                          {key === "facebook" && (
                            <FacebookPreview
                              restaurant={restaurant}
                              image={image}
                              post={generatedContent[key].post}
                              cta={generatedContent[key].cta}
                            />
                          )}

                          {key === "google" && (
                            <GooglePreview
                              restaurant={restaurant}
                              image={image}
                              summary={generatedContent[key].summary}
                              details={generatedContent[key].details}
                              cta={generatedContent[key].cta}
                            />
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* ================= EMPTY STATE ================= */
              <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7d7d0] bg-white px-8 text-center">
                {/* Empty state icon */}
                <span className="flex size-11 items-center justify-center rounded-full bg-[#f5f0e7] text-[#9c773a]">
                  <Icon name="sparkle" className="size-5" />
                </span>

                {/* Empty state message */}
                <h3 className="mt-4 font-serif text-xl font-semibold text-[#273830]">
                  Your content will appear here
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-[#818a84]">
                  Add a few details about your dish, then we’ll create a
                  tailored kit for every channel.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#e8e5dd] px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between text-xs text-[#89918c]">
          <span>© {new Date().getFullYear()} Dishboost</span>

          <span className="hidden sm:block">
            Focus on cooking, we'll handle the rest.
          </span>
        </div>
      </footer>
    </main>
  );
}
