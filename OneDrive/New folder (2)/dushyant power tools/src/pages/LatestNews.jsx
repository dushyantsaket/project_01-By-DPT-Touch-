import React from 'react';
import { ChevronRight, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsData = [
  {
    id: 1,
    title: "TCT Saw Blades Explained: Which Blade Is Right for MDF, Plywood & Hardwood?",
    description: "Choosing the right TCT (Tungsten Carbide Tipped) saw blade is important for getting smooth, clean and chip-free cuts on different types of wood. MDF a...",
    date: "27",
    monthYear: "Nov, 25",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/ZV1QxerqMB6cn7lsQD01uThf3WfLpJoD6pHI0XXN.jpg",
    link: "https://www.endicopowertools.com/latest-news/tct-saw-blades-explained-which-blade-is-right-for-mdf-plywood-and-hardwood"
  },
  {
    id: 2,
    title: "Why Endico Power Tools Are Not Expensive, But Actually Cheaper in the Long Run – A Real Case Study for Power Tools Professionals",
    description: "When customers compare prices in the Indian power tool market, Endico products may seem slightly more expensive at first glance. For example, an ordin...",
    date: "30",
    monthYear: "Apr, 25",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/wOhruz8jB9qZY53Q7pf3mUahAN5ywT0Of84CoFp9.jpg",
    link: "https://www.endicopowertools.com/latest-news/why-endico-power-tools-are-not-expensive-but-actually-cheaper-in-the-long-run-a-real-case-study-for-power-tools-professionals"
  },
  {
    id: 3,
    title: "Buy a WoodWorking Router Machine to match your project requirements",
    description: "Modern woodworking projects are complicated and require efficient tools to ensure smooth work. Artisans use sophisticated tools to make precise cuts a...",
    date: "25",
    monthYear: "Dec, 24",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/FOTrOdrPx5xlYYopqbxdEPM8rkDoJpNlSaOUjj4J.jpg",
    link: "https://www.endicopowertools.com/latest-news/buy-a-woodworking-router-machine-to-match-your-project-requirements"
  },
  {
    id: 4,
    title: "India Wood 2024",
    description: "Our Participation at Asia's one of the biggest exhibition of Wood Working Industry,Organized by NürnbergMesse India from 22 to 26 Feb 2024 at BIEC, B...",
    date: "01",
    monthYear: "Mar, 24",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/xjXeqvwHXnBfl84oIn5AI8LdHYHQ9L3C9GkkSQEJ.jpg",
    link: "https://www.endicopowertools.com/latest-news/india-wood-2024"
  },
  {
    id: 5,
    title: "Delhi Wood 2023",
    description: "Delhi Wood 2023India's largest exhibition on wood working industry, organized by Nürnbergmesse Indiaat India Expo Center & Mart, Noida from 2 Mar...",
    date: "23",
    monthYear: "Mar, 23",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/ZkY8QVnodPum5yT6xtsOMCCJTcpiQSM9nk7wP6Lz.jpg",
    link: "https://www.endicopowertools.com/latest-news/delhi-wood-2023"
  },
  {
    id: 6,
    title: "How to change carbon brush set of Endico Router",
    description: "Here is the video showing how you can change the carbon brush set of Endico Router machine.Some important information about carbon brushes:When the ca...",
    date: "19",
    monthYear: "Nov, 22",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/ak6SqhKrcetOyuh91KSERh1AYDPdtLEk8CNWPcB4.jpg",
    link: "https://www.endicopowertools.com/latest-news/how-to-change-carbon-brush-set-of-endico-router"
  },
  {
    id: 7,
    title: "Annual Sports Day Celebration at Endico Power Tools (India)",
    description: "The Third Annual Sports Day and Diwali 2022 Celebration at Endico Power Tools (India) With Over 10 Different Competitions And Games, Here are some Gli...",
    date: "15",
    monthYear: "Nov, 22",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/PaSKjOufZDl27sS7pwvvMdEkC2d3u1CBTsUbCCWK.jpg",
    link: "https://www.endicopowertools.com/latest-news/annual-sports-day-celebration-at-endico-power-tools-india"
  },
  {
    id: 8,
    title: "Beginners Guide To Buying Power Tools",
    description: "Buying power tools can be pretty high-priced these days and as soon as you are completed with them, you honestly put them in your garage or storeroo...",
    date: "09",
    monthYear: "Aug, 21",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/MNlsOzMgM1mc35BAxw8nP8Z8DHDHQxzkeeEra6d4.jpg",
    link: "https://www.endicopowertools.com/latest-news/beginners-guide-to-buying-power-tools"
  },
  {
    id: 9,
    title: "Ever Best Valued Hand Router Machine",
    description: "Endico Power tools is a leading manufacturer of Hand Router Machine. We offer our customer router machine at affordable market rates In India. Our rou...",
    date: "06",
    monthYear: "Sep, 21",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/3jvOHmLQjYdUxS69Y33MvWZXUm96a52Ux1Cus5l6.jpg",
    link: "https://www.endicopowertools.com/latest-news/ever-best-valued-hand-router-machine"
  },
  {
    id: 10,
    title: "Best Angle Grinders Cutting Machine 2020",
    description: "Endico power tools are the leading manufacturers and supplier of Angle grinder in India. Angle grinder power tool is used for grinding and polishing. ...",
    date: "23",
    monthYear: "Sep, 21",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/SB0WQ2jPgr6ViWIKqpYsvpD3GLJMAWh6liTcxOYC.jpg",
    link: "https://www.endicopowertools.com/latest-news/best-angle-grinders-cutting-machine-2020"
  },
  {
    id: 11,
    title: "Buy Electric Wood Working Products Online",
    description: "ENDICO POWER TOOLS are leading manufacturer of electric wood working machines. No matter what kind of activity you’re doing, nothing is further impo...",
    date: "04",
    monthYear: "Oct, 21",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/yT0cGh21nmDu95Fgt7ssxePqmbsorjIo3Avj7T1h.jpg",
    link: "https://www.endicopowertools.com/latest-news/buy-electric-wood-working-products-online"
  },
  {
    id: 12,
    title: "Buy Marble Cutter At Affordable Prices",
    description: "Endico Powertools are leading manufacturer and supplier of marble cutters in India. A marble cutter dwells of a motor with a abundant duty plastic or ...",
    date: "14",
    monthYear: "Oct, 21",
    image: "https://www.endicopowertools.com/storage/app/public/uploads/Wx0hT7inBpfLYbfw5JkBt3VDwEKj9IMuedJyBxGj.jpg",
    link: "https://www.endicopowertools.com/latest-news/buy-marble-cutter-at-affordable-prices"
  }
];

const LatestNews = () => {
  return (
    <div className="pt-24 min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Setup */}
        <div className="flex flex-col mb-12 border-b border-gray-200/60 pb-8">
          <nav className="flex mb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <Link to="/" className="hover:text-industrial-red transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-industrial-dark">Latest News & Offers</span>
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-2 bg-industrial-red rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-black text-industrial-dark uppercase tracking-tight">
              Latest News <span className="text-industrial-red">&amp; Offers</span>
            </h1>
          </div>
          <p className="mt-4 text-gray-500 font-medium max-w-3xl">
            Stay updated with our latest product releases, industry news, company events, and exclusive offers. Check out our blog articles and case studies below.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <a 
              key={news.id} 
              href={news.link} 
              target="_blank" 
              rel="noreferrer"
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative"
            >
              {/* Date Badge */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 flex flex-col items-center justify-center border border-gray-100 shadow-md">
                <span className="text-2xl font-black text-industrial-red leading-none mb-1">{news.date}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-industrial-dark">{news.monthYear}</span>
              </div>
              
              {/* Image */}
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-gray-900 mb-4 leading-snug group-hover:text-industrial-red transition-colors line-clamp-3">
                  {news.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {news.description}
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-industrial-dark group-hover:text-industrial-red transition-colors">
                  <span className="border-b-2 border-transparent group-hover:border-industrial-red pb-0.5 transition-all">Read Full Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination placeholder (like in original site) */}
        <div className="flex justify-center mt-16">
          <div className="inline-flex items-center gap-1 bg-white border border-gray-100 p-1.5 rounded-xl shadow-sm">
            <button className="px-4 py-2 rounded-lg text-gray-400 bg-gray-50 text-sm font-bold cursor-not-allowed">‹</button>
            <button className="px-4 py-2 rounded-lg bg-industrial-red text-white text-sm font-black shadow-md">1</button>
            <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-bold transition-colors">2</button>
            <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-bold transition-colors">3</button>
            <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-bold transition-colors">›</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LatestNews;
