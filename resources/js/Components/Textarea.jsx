export default function Textarea({ ...props }) {
    return (
        <textarea
            className="w-full rounded-lg border-gray-300 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
            {...props}
        />
    );
}
