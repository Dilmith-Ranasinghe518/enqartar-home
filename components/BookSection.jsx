import React from 'react';

const BookSection = () => {
  const defaultItems = [
    { title: 'Call of duty: MW3', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=100&h=130' },
    { title: 'Halo Infinite', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=130' },
    { title: 'Cyberpunk 2077', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=100&h=130' },
    { title: 'Forza Horizon 5', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100&h=130' },
  ];

  return (
    <section className="w-full lg:max-w-7xl lg:mx-auto">
      <div className="w-full grid grid-cols-[0.85fr_1.15fr] lg:grid-cols-[0.7fr_1fr] min-h-[360px] lg:min-h-[600px] overflow-hidden rounded-[15px] shadow-2xl bg-white gap-0">
        
        {/* වම් පස කොටස - Image Background (Left Side on both Mobile and Desktop) */}
        <div 
          className="relative bg-zinc-900 text-white p-4 sm:p-6 lg:p-10 flex flex-col justify-end bg-cover bg-center rounded-l-[15px] lg:rounded-l-[15px] lg:rounded-r-none min-h-[340px] lg:min-h-full" 
          style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), transparent), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')` }}
        >
          {/* Play Button Overlay */}
          <div className="absolute top-4 right-4 lg:top-10 lg:-right-6 z-10">
            <button className="bg-red-500 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
              <span className="text-white ml-0.5 text-[10px] sm:text-xs lg:text-base">▶</span>
            </button>
          </div>

          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <span className="bg-red-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[10px] sm:text-xs font-bold uppercase inline-block">Halo</span>
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold leading-tight">
              Halo 5:<br /> Guardians
            </h1>
             
            <div className="hidden sm:flex gap-3 text-xs sm:text-sm text-gray-300">
              <span>Xbox</span>
              <span>Playstation</span>
              <span>PC</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 pt-1 lg:pt-4">
              <div className="flex flex-col">
                <span className="text-base sm:text-2xl font-bold text-white">$29</span>
                <span className="text-[10px] sm:text-sm line-through text-gray-400">$39</span>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition whitespace-nowrap">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* දකුණු පස කොටස - Content Details (Right Side on both Mobile and Desktop) */}
        <div className="bg-white p-3 sm:p-6 lg:p-16 flex flex-col justify-between space-y-3 sm:space-y-6 lg:space-y-0 rounded-r-[15px]">
          <div>
            <div className="flex justify-between items-center mb-2 sm:mb-4 lg:mb-6">
              <h2 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">Review: 4.5/5</h2>
              <button className="text-[10px] sm:text-xs lg:text-sm text-gray-400 hover:text-gray-600 font-medium">View More</button>
            </div>

            <p className="text-gray-500 leading-relaxed text-[11px] sm:text-xs lg:text-sm mb-3 sm:mb-6 lg:mb-8 line-clamp-4 lg:line-clamp-none">
              Halo 5: Guardians is a first-person shooter video game developed by 343 Industries... 
              The game's plot follows two fireteams of human supersoldiers: Blue Team, led by Master Chief, 
              and Fireteam Osiris, led by Spartan Locke.
            </p>

            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-6 lg:mb-10">
              <div>
                <span className="text-gray-400">Series : </span>
                <span className="font-semibold text-gray-700">Halo</span>
                <br />
                <span className="text-gray-400">Release Date : </span>
                <span className="font-semibold text-gray-700">October 27, 2015</span>
              </div>
              <div className="pt-2 sm:pt-0">
                <button className="text-red-500 border-red-500 border-2 rounded-full px-5 py-2 hover:bg-red-50 text-xs sm:text-sm font-semibold transition">
                  View More
                </button>
              </div>
            </div>
          </div>

          {/* Related Games Thumbnails Slider (Mobile: exactly 2 cards visible on right, Desktop: 4 cards grid) */}
          <div className="w-full min-w-0">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-2 scroll-smooth lg:grid lg:grid-cols-4 lg:gap-3 lg:overflow-visible">
              {defaultItems.map((item, index) => (
                <div 
                  key={index} 
                  className="w-[calc(50%-4px)] min-w-[calc(50%-4px)] shrink-0 lg:w-auto lg:min-w-0 lg:shrink space-y-1 sm:space-y-2"
                >
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition duration-300 hover:scale-105" 
                      alt={item.title}
                    />
                  </div>
                  <p className="text-[9px] sm:text-[11px] lg:text-[10px] font-bold text-gray-800 truncate">{item.title}</p>
                </div>
              ))}
            </div>
            <button className="mt-2 sm:mt-3 lg:mt-4 text-[10px] sm:text-xs font-bold text-gray-700 flex items-center gap-1 hover:gap-2 transition-all">
              See More <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BookSection;