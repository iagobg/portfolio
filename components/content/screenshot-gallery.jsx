import Image from "next/image";

export function ScreenshotGallery({ screenshots = [], title = "Screenshots" }) {
  if (!screenshots?.length) return null;

  return (
    <section aria-labelledby="screenshots-heading" className="mt-10">
      <h2 id="screenshots-heading" className="mb-4 font-sans text-2xl font-bold text-ink-100">
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {screenshots.map((screenshot, index) => (
          <figure
            key={screenshot.src}
            className={index === 0 ? "md:col-span-2" : undefined}
          >
            <div className="overflow-hidden rounded border border-workbench-700 bg-workbench-900">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={960}
                height={600}
                className="h-auto w-full"
              />
            </div>
            {screenshot.caption ? (
              <figcaption className="mt-2 font-mono text-xs leading-5 text-ink-300">
                {screenshot.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
