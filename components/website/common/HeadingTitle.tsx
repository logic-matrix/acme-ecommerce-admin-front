type HeadingTitleProps = {
  title: string;
};

const HeadingTitle = ({ title }: HeadingTitleProps) => {
  return (
    <h1 className="whitespace-pre-line text-3xl md:text-4xl lg:text-5xl leading-8 md:leading-14 mb-8 sm:mb-10 md:mb-12 font-bold text-[#292D32] ">
      {title}
    </h1>
  );
};

export default HeadingTitle;
