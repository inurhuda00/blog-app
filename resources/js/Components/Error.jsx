export default function Error({ value, children }) {
    return (
        <div className="mt-2 font-medium text-rose-500">
            {value ? value : children}
        </div>
    );
}
