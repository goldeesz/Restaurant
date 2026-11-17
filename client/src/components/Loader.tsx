
export default function Loader({ text }: { text: string }) {
    return (
        <div className="min-h-screen bg-[#F5F0E8] flex flex-col justify-center items-center">
            <div className="w-12 h-12 border-2 border-[#D8CBBB] border-t-[#702638] rounded-full animate-spin" />

            <p className="font-display text-sm tracking-widest text-[#702638] mt-5 animate-pulse uppercase text-center px-4">
                {text}
            </p>
        </div>
    );
}
