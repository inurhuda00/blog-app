const Section = ({ title }) => <>{title}</>;

const Title = ({ title }) => (
    <div className="mb-5 inline-flex items-center justify-start px-2 md:px-8">
        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
            {title}
        </h2>
    </div>
);

Section.Title = Title;

export default Section;
