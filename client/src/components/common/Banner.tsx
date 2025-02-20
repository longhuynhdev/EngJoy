interface BannerProps {
  title: string;
  description: string | React.ReactElement;
  height?: string;
  width?: string;
  backgroundUrl?: string;
}

export function Banner({
  title,
  description,
  height = "200px",
  width = "100%",
  backgroundUrl,
}: BannerProps) {
  return (
    <div
      className="relative border-b"
      style={{
        height,
        width,
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="" />
      <div className="relative flex flex-col justify-center h-full px-6 py-8 mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-2xl font-bold text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
