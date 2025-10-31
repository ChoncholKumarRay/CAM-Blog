import React, { useState } from "react";

const WritingInstruction = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("publication.camsust@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="font-bangla">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400 font-roboto">
        Instructions for Blog Writing
      </h1>

      <ul className="list-disc list-inside space-y-4 text-gray-200 leading-relaxed">
        <li>
          লেখার জন্য নিম্নে উল্লিখিত ক্যাটাগরি থেকে যেকোনো টপিক বেছে নিতে হবে।
          তবে চাইলে জ্যোতির্বিজ্ঞানবিষয়ক নতুন যেকোনো টপিকেও লিখতে পারবেন।
          সেক্ষত্রে লেখার পূর্বেই আমাদের অবহিত করতে হবে। গৃহীত হলে ঐ টপিক নিয়ে
          লিখা পাঠাতে পারবেন।
        </li>
        <li>
          আমরা বাংলায় বিজ্ঞান চর্চাকে উৎসাহ দেই। তবে কেউ চাইলে ইংরেজিতেও লিখা
          জমা দিতে পারবেন।
        </li>
        <li>ইউনিকোড কি-বোর্ডে (বাংলার ক্ষেত্রে) লিখতে হবে।</li>
        <li>
          যেকোনো লিখা Google Doc এ লিখে ফাইলের লিংক আমাদের পাঠাতে হবে। এক্ষেত্রে
          নিম্নোক্ত ইমেইলে ফাইলটির এডিট অ্যাকসেস প্রদান করতে হবে।{" "}
          <span
            onClick={handleCopy}
            className="cursor-pointer hover:underline hover:text-blue-300 relative"
            title="Click to copy"
          >
            publication.camsust@gmail.com
            {copied && (
              <span className="absolute -top-6 left-0 text-xs text-green-400 bg-gray-700 px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </span>
        </li>
        <li>
          প্রবন্ধ লিখার শেষে অবশ্যই প্রচলিত প্রথায় রেফারেন্স উল্লেখ করতে হবে।
          এবং সবার শেষে লেখকের নাম (বাংলা ও ইংরেজিতে), ঠিকানা কিংবা অধ্যয়নরত
          শিক্ষা প্রতিষ্ঠানের নাম যুক্ত করতে হবে।
        </li>
        <li>
          নতুন কোনো একটা টপিক নির্বাচনের পর প্রত্যেক সপ্তাহে লেখা সম্পর্কে আপডেট
          দিতে হবে। পর পর দুই সপ্তাহ আপডেট না দিলে গৃহিত টপিক অন্য কেউ নিয়ে নিতে
          পারবে।
        </li>
      </ul>
    </section>
  );
};

export default WritingInstruction;
