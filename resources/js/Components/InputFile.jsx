export default function InputFile({ onChange, accept = ".jpg, .png, .jpeg" }) {
    return (
        <input
            accept={accept}
            onChange={onChange}
            type="file"
            className="file:mr-3 file:rounded-lg file:border-0 file:bg-gray-200  file:px-2 file:py-2 file:text-sm file:font-medium file:text-black file:transition file:duration-200 file:hover:bg-gray-300"
        />
    );
}
