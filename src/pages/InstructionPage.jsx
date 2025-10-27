import React from "react";

const InstructionPage = () => {
  return (
    <div
      className="relative z-10 min-h-screen flex justify-center pt-28 px-6 pb-12 text-white"
      style={{
        backgroundColor: "#121212",
        fontFamily: "'Tiro Bangla', 'Roboto', sans-serif",
      }}
    >
      <div className="w-full max-w-5xl bg-gray-800/80 rounded-xl p-8 shadow-lg backdrop-blur-sm space-y-10">
        {/* Bangla Section */}
        <section style={{ fontFamily: "'Tiro Bangla', serif" }}>
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
            প্রবন্ধ রচনা করার কিছু নির্দেশনা
          </h1>
          <ul className="list-disc list-inside space-y-4 text-gray-200 leading-relaxed">
            <li>
              লেখার জন্য অবশ্যই আমাদের ওয়েবসাইটে উল্লেখিত টপিক বেছে নিতে হবে।
              তবে নতুন টপিক সংযুক্ত করার জন্যে আবেদন করা যাবে। গৃহীত হলে ঐ টপিক
              নিয়ে লিখা পাঠাতে পারবেন।
            </li>
            <li>
              আমরা বাংলায় বিজ্ঞান চর্চাকে উৎসাহ দেই। তবে কেউ চাইলে ইংরেজিতেও
              লিখা জমা দিতে পারবেন।
            </li>
            <li>
              ইউনিকোড কি-বোর্ডে (বাংলার ক্ষেত্রে) লেখতে হবে এবং Doc file হিসেবে
              পাঠাতে হবে।
            </li>
            <li>
              প্রবন্ধ লিখার শেষে অবশ্যই প্রচলিত প্রথায় রেফারেন্স উল্লেখ করতে
              হবে। এবং সবার শেষে লেখকের নাম, ঠিকানা ও একটি ছবি দিতে হবে।
            </li>
            <li>
              কোন একটা বিষয় নির্বাচনের পর প্রত্যেক সপ্তাহে লেখা সম্পর্কে আপডেট
              দিতে হবে। পর পর দুই সপ্তাহ আপডেট না দিলে গৃহিত টপিক অন্য কেউ নিয়ে
              নিতে পারবে।
            </li>
          </ul>
        </section>

        {/* English Section */}
        <section style={{ fontFamily: "'Roboto', sans-serif" }}>
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
            Content Suggestion to Writers
          </h2>

          <div className="space-y-10 text-gray-200 leading-relaxed">
            {/* First Thing First */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                # First Thing First
              </h3>
              <p>
                You may have a very interesting topic to write that we didn’t
                mention in the list. So, don’t hesitate to contact us.
              </p>
            </div>

            {/* Planetary Science */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Planetary Science (Formation, Geological History, Environmental
                History)
              </h3>
              <ul className="list-disc list-inside">
                <li>Mercury</li>
                <li>Venus</li>
                <li>Earth</li>
                <li>Mars</li>
                <li>Saturn</li>
                <li>Jupiter</li>
                <li>Uranus</li>
                <li>Neptune</li>
                <li>Pluto and other dwarf planets</li>
                <li>Kuiper belt, Planetary Moons</li>
                <li>Oort Cloud</li>
                <li>Exoplanets</li>
              </ul>
            </div>

            {/* Stellar Science */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Stellar Science
              </h3>
              <ul className="list-disc list-inside">
                <li>Stars</li>
                <li>Black Holes</li>
                <li>Galaxy</li>
              </ul>
            </div>

            {/* Space Missions */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Space Missions
              </h3>
              <ul className="list-disc list-inside">
                <li>Apollo</li>
                <li>Curiosity</li>
                <li>Opportunity</li>
                <li>Mars MRO</li>
                <li>Cassini</li>
                <li>Juno</li>
                <li>Voyager</li>
                <li>Vikings</li>
              </ul>
            </div>

            {/* Observational Astronomy */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Observational Astronomy
              </h3>
              <ul className="list-disc list-inside">
                <li>Reflective Telescope and its mechanism</li>
                <li>Refractive Telescope and its mechanism</li>
                <li>James Webb Space Telescope</li>
                <li>Hubble Space Telescope</li>
                <li>Comparative analysis of Hubble and James Webb Telescope</li>
                <li>Gaia Space Observatory</li>
                <li>Star Patterns and Constellations</li>
                <li>The mythology of Constellations</li>
                <li>Origami and Astronomy</li>
              </ul>
            </div>

            {/* Astro-Physics */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Astro-Physics
              </h3>
              <ul className="list-disc list-inside">
                <li>Stellar Astrophysics</li>
                <li>Extra Galactic Astrophysics</li>
                <li>Astrophysics of the Interstellar Medium</li>
                <li>Instrumentation</li>
                <li>Observational Cosmology</li>
                <li>High Energy Astrophysics</li>
                <li>Mathematics for Astronomy</li>
              </ul>
            </div>

            {/* Historical Astronomy */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Historical Astronomy
              </h3>
              <ul className="list-disc list-inside">
                <li>Newgrange Tomb</li>
                <li>Stonehenge</li>
                <li>Pyramid</li>
                <li>First Estimation of Earth-Sun Distance</li>
                <li>
                  Works of Eratosthenes (First Measurement of Earth’s
                  Circumference)
                </li>
              </ul>
            </div>

            {/* Astronomy Tools */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Astronomy Tools
              </h3>
              <ul className="list-disc list-inside">
                <li>Astropy</li>
                <li>Sky View</li>
                <li>Stellarium</li>
                <li>TOPCAT</li>
                <li>Universe Sandbox</li>
                <li>Aladin</li>
              </ul>
            </div>

            {/* Astronomy & Entertainment */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Astronomy & Entertainment
              </h3>
              <ul className="list-disc list-inside">
                <li>The Planets by BBC</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InstructionPage;
