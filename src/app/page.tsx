"use client";

import { ChangeEvent, useMemo, useState } from "react";
import Image from "next/image";
import Icon, { type IconName } from "./components/icons";

const platformStyles = {
  instagram: {
    label: "Instagram",
    icon: "instagram" as IconName,
    color: "bg-[#f3e9ed] text-[#b24f72]",
    meta: "Caption + hashtags",
  },
  facebook: {
    label: "Facebook",
    icon: "facebook" as IconName,
    color: "bg-[#e9eff9] text-[#3568b9]",
    meta: "Community post",
  },
  google: {
    label: "Google Business",
    icon: "google" as IconName,
    color: "bg-[#f4eee3] text-[#987535]",
    meta: "Local update",
  },
  email: {
    label: "Email",
    icon: "mail" as IconName,
    color: "bg-[#e9f0ec] text-[#39765c]",
    meta: "Newsletter copy",
  },
};

export default function Home() {
  const [restaurant, setRestaurant] = useState("Luna Osteria");
  const [description, setDescription] = useState(
    "Modern Italian dining in the heart of Brooklyn",
  );
  const [details, setDetails] = useState(
    "Summer menu launch · Available this weekend",
  );
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const content = useMemo(() => {
    
    return {
      instagram: generatedContent,
      facebook: `bla`,
      google: ` bla`,
      email: `bla`,
    };
  }, [generatedContent]);

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
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
      }),
    });

    const result = await res.json();

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
          <button
            className="flex size-9 items-center justify-center rounded-full border border-[#e2e2dc] bg-white text-[#516059]"
            aria-label="Open account menu"
          >
            <span className="text-sm font-semibold">JD</span>
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-11 sm:px-8 lg:pt-16">
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

        <div
          id="generator"
          className="mt-11 grid gap-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(500px,1.18fr)] lg:items-start"
        >
          <section className="rounded-[24px] border border-[#e5e3dc] bg-white p-5 shadow-[0_2px_2px_rgba(26,39,33,0.02),0_14px_35px_rgba(26,39,33,0.045)] sm:p-7">
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

            <div className="mt-6 space-y-5">
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
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#304038]">
                  A little about your place
                </span>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#deded8] bg-[#fffefd] px-3.5 text-[15px] outline-none transition placeholder:text-[#a4aaa5] focus:border-[#789484] focus:ring-4 focus:ring-[#edf3ef]"
                  placeholder="Your cuisine, neighborhood, or vibe"
                />
              </label>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#304038]">
                    Add a food photo
                  </span>
                  <span className="text-xs text-[#8c9690]">
                    JPG, PNG · up to 10 MB
                  </span>
                </div>
                <label className="group relative flex min-h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#c8d1ca] bg-[#fafbf9] transition hover:border-[#6e8b7b] hover:bg-[#f6faf7]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="sr-only"
                  />
                  {image ? (
                    <>
                      <Image
                        src={image}
                        alt="Uploaded food"
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                      <span className="relative rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#315543] shadow-sm">
                        Replace photo
                      </span>
                    </>
                  ) : (
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
            </div>
          </section>

          <section className="rounded-[24px] border border-[#e5e3dc] bg-[#f5f4f0] p-4 shadow-[0_2px_2px_rgba(26,39,33,0.02),0_14px_35px_rgba(26,39,33,0.04)] sm:p-5">
            <div className="mb-4 flex items-center justify-between px-1">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a8479]">
                  Ready to share
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.035em] text-[#20312a]">
                  Your content kit
                </h2>
              </div>
              <button className="flex items-center gap-1 text-sm font-semibold text-[#56655e] transition hover:text-[#2d493b]">
                All platforms <Icon name="chevron" className="size-4" />
              </button>
            </div>
            {generatedContent ? (
              <div className="grid gap-3">
                {(
                  Object.keys(platformStyles) as Array<
                    keyof typeof platformStyles
                  >
                ).map((key) => {
                  const platform = platformStyles[key];
                  return (
                    <article
                      key={key}
                      className="rounded-2xl border border-[#e6e4df] bg-white p-4 transition hover:border-[#d6d9d3] sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${platform.color}`}
                        >
                          <Icon name={platform.icon} className="size-[18px]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-bold text-[#263630]">
                                {platform.label}
                              </h3>
                              <p className="mt-0.5 text-xs text-[#909891]">
                                {platform.meta}
                              </p>
                            </div>
                            <button
                              onClick={() => copyContent(key, content[key])}
                              className="flex h-8 items-center gap-1.5 rounded-lg border border-[#e5e6e2] px-2.5 text-xs font-semibold text-[#59665f] transition hover:bg-[#f6f8f5]"
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
                          <p className="mt-3 whitespace-pre-line text-[13px] leading-[1.55] text-[#556159] sm:text-sm">
                            {content[key]}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7d7d0] bg-white px-8 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-[#f5f0e7] text-[#9c773a]">
                  <Icon name="sparkle" className="size-5" />
                </span>
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
