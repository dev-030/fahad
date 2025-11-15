interface ValueBlockProps {
    title: string;
    children: React.ReactNode;
}

export const ValueBlock: React.FC<ValueBlockProps> = ({ title, children }) => (
    <div className="bg-[#1a1a1a] px-6 py-8 w-full">
        <h3 className="text-white-600 font-bold text-white tracking-widest mb-3 border-l-8 border-red-500 pl-3 uppercase text-3xl">
            {title}
        </h3>
        <p className="text-xl text-gray-300/80 font-exo">
            {children}
        </p>
    </div>
);