const TipsPage = () => {
  return (
    <div
      className="relative z-10 min-h-screen flex justify-center items-start pt-28 px-4 pb-12"
      style={{
        fontFamily: "'Tiro Bangla', sans-serif",
        backgroundColor: "#121212",
      }}
    >
      <div className="w-full max-w-3xl bg-gray-800/80 rounded-xl p-8 shadow-lg backdrop-blur-sm text-white space-y-6">
        <h1
          className="text-3xl font-bold mb-6 text-blue-400 text-center"
          style={{
            fontFamily: "'Roboto', 'Roboto', sans-serif",
          }}
        >
          Blog Writing Tips
        </h1>

        <ol className="list-decimal list-inside space-y-4 text-gray-200 leading-relaxed text-lg">
          <li>
            প্রথমে আপনার আর্টিকেলের জন্য একটা মজার শিরোনাম (Title) খুঁজে বের
            করতে হবে। মজাদার শিরোনাম সবসময় পাঠকদের মনোযোগ আকর্ষণে ভূমিকা রাখে।
          </li>
          <li>
            শুরুটা হতে হবে আকর্ষণীয় যেটা পাঠকদের বাধ্য করবে বাকিটা পড়তে। কোনকিছু
            পড়া শুরু করলে যদি প্রথমেই সেটা আমাদের কাছে আকর্ষণীয় মনে না হয়, তাহলে
            স্বভাবতই আমরা সেটা এড়িয়ে যাই। তাই শুরুটা লেখার ক্ষেত্রে একটু বেশি
            সময় খরচ করতে হবে।
          </li>
          <li>
            চাইলে একটা প্রশ্ন দিয়ে শুরু করতে পারেন। একটা প্রশ্ন যে কারো মনে
            কৌতূহল সৃষ্টি করবে এবং তারা সেই প্রশ্নের উত্তর জানার জন্য হলেও
            বাকিটা পড়বে। এক্ষেত্রে মনে রাখতে হবে যে প্রশ্নটা যেন আর্টিকেলের
            বিষয়ের সাথে মিল রেখে করা হয়। তা নাহলে পাঠকরা বিরক্ত হতে পারে।
          </li>
          <li>
            চেষ্টা করতে হবে যেকোনো বিষয় সর্বোচ্চ সহজভাবে বুঝানোর এবং ব্যাখ্যা
            করার। এক্ষেত্রে লেখা শুরুর দিকে মাথায় রাখতে পারেন যে আপনি যাদের
            উদ্দেশ্যে লিখছেন তাদের ঐ বিষয়ে শুধু মৌলিক ধারণা আছে। তারা আপনার লেখা
            থেকেই ঐ বিষয় সম্পর্কে বিস্তারিত জানবে।
          </li>
          <li>
            লেখাকে সহজ-সাবলীল করার জন্য সবসময় বহুল ব্যবহৃত শব্দগুলো ব্যবহার
            করুন। যেসব শব্দ আমরা সচরাচর ব্যবহার করিনা ঐগুলো এড়িয়ে চলাই ভাল।
          </li>
          <li>
            নিজের লেখার ধরন খুঁজে বের করার চেষ্টা করুন। মানে আপনি ছোট আর্টিকেল
            লিখতে বেশি স্বাচ্ছন্দ্যবোধ করেন নাকি বড় আর্টিকেল লিখতে। এটা আপনার
            লেখার পরিকল্পনার জন্য খুবই গুরুত্বপূর্ণ।
          </li>
          <li>
            আর্টিকেলের মধ্যে প্যারা বা অনুচ্ছেদগুলো ছোট রাখবেন। এক্ষেত্রে আদর্শ
            অনুচ্ছেদ হতে পারে সর্বোচ্চ ৪ লাইন। এক্ষেত্রে মাথায় রাখতে হবে যে
            এখানে ৪ লাইনের কথা বলা হয়েছে, ৪টা বাক্যের কথা না।
          </li>
          <li>
            লেখার ক্ষেত্রে নিজেকে সবসময় “First Person” হিসেবে রাখবেন এবং মনে
            করবেন যে আপনি আপনার সামনে বসে আছে এমন কোনো ব্যক্তির সাথে ঐ বিষয়ে
            আলোচনা করছেন। এটা আর্টিকেলকে প্রাণবন্ত করে তুলতে সাহায্য করে।
          </li>
          <li>
            আর্টিকেলের বিষয় নির্বাচনের ক্ষেত্রে যে বিষয়ে আপনার আগ্রহ আছে ওগুলোকে
            প্রাধান্য দিন। কারন আপনার নিজের আগ্রহ না থাকলে আপনি কোনো বিষয়কে
            অন্যের কাছে আকর্ষণীয় করে তুলতে পারবেন না।
          </li>
          <li>
            লেখা শুরু করার আগে পাঠক নির্বাচন করে নিন। পাঠক কে বুঝতে চেষ্টা করুন,
            তারা কী চায়?
          </li>
          <li>
            ভাল লেখক হতে হলে আগে ভাল পাঠক হতে হবে। তাই যে বিষয়ে লিখবেন তার উপর
            ভাল জ্ঞান অর্জন করতে চেষ্টা করুন। এবং পড়াশোনা করার সময় কিছু
            আকর্ষণীয় ও গুরুত্বপূর্ণ বিষয় লিপিবদ্ধ করে নিতে পারেন।
          </li>
          <li>
            লেখা এবং সম্পাদনা একইসাথে করা থেকে বিরত থাকার চেষ্টা করুন।একইসাথে
            দুই কাজ করতে গিয়ে হয়ত আপনি যেভাবে লিখতে চেয়েছিলেন তা থেকে বিচ্যুত
            হয়ে যেতে পারেন। তাই সম্পূর্ণ লেখা শেষ হলে তারপর সম্পাদনা করে নিন।
          </li>
          <li>
            বিষয়বস্তু ভাল বোধগম্য করে তুলতে পর্যাপ্ত ছবি ব্যবহার করতে পারেন।
          </li>
          <li>
            আমরা কোন একটা প্রবন্ধ পুরোপুরি পড়া আগে একবার ওভারভিউ করে নেই যে, এই
            প্রবন্ধটি আমার জন্য কিনা বা আমি যে সময় দিব তা আমার জন্য ফলপ্রসূ হবে
            কিনা! তাই আপনার প্রবন্ধের গুরুত্বপূর্ণ কিছু বিষয় মার্ক করে বা বোল্ড
            (মোটা অক্ষরে) করে দিতে পারেন।
          </li>
        </ol>

        {/* Author Credit Section */}
        <div className="mt-8 border-gray-700 text-gray-400">
          <p className="text-l font-medium">Tips compiled by</p>
          <p className="text-l font-semibold">AR Raqeeb</p>
          <p className="text-sm text-gray-400">
            Freelance Blogger & Former Regional Head, Barisal Division, CAM-SUST
          </p>
        </div>

        {/* Workshop Video Section */}
        <div className="pt-8 border-t border-gray-700">
          <h2
            className="text-2xl font-semibold text-center mb-4"
            style={{
              fontFamily: "'Roboto', 'Roboto', sans-serif",
            }}
          >
            Here is our online workshop on <br />
            <span className="text-blue-400">
              Scientific Writing by Uchsash Tousif
            </span>
          </h2>

          <div className="w-full flex justify-center">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Ra5vf5HGDZo?si=NU2vYxDnIgz4OeBK"
                title="Workshop on Scientific Writing"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsPage;
