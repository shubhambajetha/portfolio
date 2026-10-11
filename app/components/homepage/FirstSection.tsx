export function FirstSection() {
    const link = []
    return (
        <div className="max-w-[1490px] mx-auto px-2 py-3 bg-black">
            <div className="px-4 py-4">
                <h1 className="text-[clamp(4rem,9vw,9rem)] font-bold leading-[0.9] tracking-[-0.055em] text-white">
                    FULL- STACK
                </h1>
                <div className="grid grid-cols-2 mt-1">
                    <div className="col-span-4 font-rajdhani">
                        <p>
                            I always believe code should be readable before it is logical —
                            <br />
                            because code isn’t written only to make products work,
                            <br />
                            it’s written so people can understand, maintain, and build those products
                        </p>

                    </div>

                    <div className="col-span-6">
                        <h1 className="text-[clamp(4rem,9vw,9rem)] font-bold leading-[0.9] tracking-[-0.055em] text-white">
                            DEVELOPER
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}