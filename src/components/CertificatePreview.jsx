import React from 'react';

const CertificatePreview = ({ name, t }) => {
    return (
        <div className="w-full mt-12 animate-fade-up">
            <h2 className="text-3xl font-black text-white text-center mb-8">🎖️ Ready for your Career Launch?</h2>
            <div className="max-w-md mx-auto aspect-[1.4/1] bg-white rounded-lg shadow-2xl p-8 border-[12px] border-blue-900 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-50/50 flex items-center justify-center opacity-10 rotate-[-45deg] pointer-events-none">
                    <span className="text-6xl font-black">GOI OFFICIAL</span>
                </div>

                <div className="border-4 border-blue-100 h-full p-4 flex flex-col items-center justify-between text-center relative z-10">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl">🇮🇳</span>
                        <h4 className="text-xs font-black text-blue-900 tracking-widest mt-2">CERTIFICATE OF RECOMMENDATION</h4>
                        <div className="w-16 h-1 bg-blue-900 my-2"></div>
                    </div>

                    <div className="py-2">
                        <p className="text-[10px] italic text-gray-500">This is to signify that</p>
                        <h3 className="text-xl font-bold text-gray-900 underline decoration-blue-500 mt-1">
                            Student of Bharat
                        </h3>
                        <p className="text-[10px] text-gray-600 mt-2 px-6">
                            Has been successfully matched with PM-verified internship opportunities through CAREER LENS.
                        </p>
                    </div>

                    <div className="flex justify-between w-full mt-4">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-px bg-gray-400 mb-1"></div>
                            <span className="text-[6px] font-bold">Director</span>
                        </div>
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <span className="text-2xl opacity-20">🛡️</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-px bg-gray-400 mb-1"></div>
                            <span className="text-[6px] font-bold">PM Internship Cell</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center text-blue-100 font-bold mt-4 animate-pulse">
                {t.lang === 'hi' ? "सफलता की ओर आपका पहला कदम!" : "Your first step towards success!"}
            </p>
        </div>
    );
};

export default CertificatePreview;
