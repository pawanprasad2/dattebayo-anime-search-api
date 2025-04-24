import { useEffect, useState } from "react";

const App = () => {
  const [char, setChar] = useState([]);
  const [clans, setClans] = useState([]);
  const [vill, setVill] = useState([]);
  const [team, setTeam] = useState([]);
  const [beast, setBeast] = useState([]);
  const [akatsuki, setAkatsuki] = useState([]);
  const [kara, setKara] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const baseUrl = "https://dattebayo-api.onrender.com";
        const endpoints = [
          { url: `${baseUrl}/characters`, setter: setChar, type: "characters", key: "characters" },
          { url: `${baseUrl}/clans`, setter: setClans, type: "clan", key: "clans" },
          { url: `${baseUrl}/villages`, setter: setVill, type: "villages", key: "villages" },
          { url: `${baseUrl}/teams`, setter: setTeam, type: "teams", key: "teams" },
          { url: `${baseUrl}/tailed-beasts`, setter: setBeast, type: "tailed-beasts", key: "tailed-beasts" },
          { url: `${baseUrl}/akatsuki`, setter: setAkatsuki, type: "Akatsuki", key: "akatsuki" },
          { url: `${baseUrl}/kara`, setter: setKara, type: "kara", key: "kara" },
        ];

        const promises = endpoints.map(endpoint => 
          fetch(endpoint.url)
            .then(res => res.json())
            .then(data => {
              const items = Array.isArray(data[endpoint.key]) 
                ? data[endpoint.key].map(item => ({ ...item, type: endpoint.type }))
                : [];
              endpoint.setter(items);
              return items;
            })
        );

        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  const allData = [
    ...char,
    ...clans,
    ...vill,
    ...team,
    ...beast,
    ...akatsuki,
    ...kara,
  ];

  const filteredData = allData.filter((item) => {
    // First filter by search term
    const values = Object.values(item).join(" ").toLowerCase();
    const searchMatch = values.includes(search.toLowerCase());
    
    // Then filter by category if not showing all
    if (activeCategory !== "all") {
      return searchMatch && item.type === activeCategory;
    }
    
    return searchMatch;
  });

  const categories = [
    { id: "all", name: "All" },
    { id: "characters", name: "Characters" },
    { id: "clan", name: "Clans" },
    { id: "villages", name: "Villages" },
    { id: "teams", name: "Teams" },
    { id: "tailed-beasts", name: "Tailed Beasts" },
    { id: "Akatsuki", name: "Akatsuki" },
    { id: "kara", name: "Kara" }
  ];

  // Fix image URLs - add base URL if needed
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/api/placeholder/300/200";
    
    // Check if URL is already absolute
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it's a relative URL, add the base URL
    return `https://dattebayo-api.onrender.com${imageUrl}`;
  };

  // Check if image exists or return placeholder
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/300/200";
  };

  const renderCardContent = (item) => {
    const importantFields = ['name', 'village', 'clan', 'rank', 'age', 'description'];
    const secondaryFields = Object.keys(item).filter(key => 
      !importantFields.includes(key) && key !== 'image' && key !== 'type'
    );

    return (
      <>
        <h2 className="text-2xl font-bold text-amber-800 mb-2">
          {item.name || item.clan || item.village || "Unknown"}
        </h2>
        <div className="text-xs inline-block px-2 py-1 rounded-full bg-amber-200 text-amber-800 mb-3">
          {item.type}
        </div>
        
        {item.image && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={getImageUrl(item.image)}
              alt={item.name || item.clan || item.village}
              className="w-full h-48 object-cover transition-transform hover:scale-105"
              onError={handleImageError}
            />
          </div>
        )}
        
        <div className="space-y-2">
          {importantFields.map(field => 
            item[field] ? (
              <p key={field} className="text-gray-700">
                <span className="font-semibold capitalize">{field}:</span> {
                  typeof item[field] === 'object' 
                    ? JSON.stringify(item[field]) 
                    : item[field]
                }
              </p>
            ) : null
          )}
          
          {secondaryFields.length > 0 && (
            <details className="mt-2">
              <summary className="text-sm text-amber-700 font-medium cursor-pointer">
                Show more details
              </summary>
              <div className="mt-2 pl-2 border-l-2 border-amber-200 text-sm">
                {secondaryFields.map(field => (
                  <p key={field} className="text-gray-600 my-1">
                    <span className="font-medium capitalize">{field}:</span> {
                      typeof item[field] === 'object' 
                        ? JSON.stringify(item[field]) 
                        : item[field]
                    }
                  </p>
                ))}
              </div>
            </details>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-500 to-amber-700">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-6 mb-8">
          <h1 className="text-5xl font-bold text-center text-amber-800 mb-2">
            Dattebayo API
          </h1>
          <p className="text-center text-amber-600 mb-6">
            Search the Naruto universe
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search anything (character, clan, village...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-4 rounded-lg w-full shadow-md border border-amber-200 text-gray-800 bg-amber-50 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
              <div className="absolute right-3 top-4 text-amber-400">
                {search && (
                  <button 
                    onClick={() => setSearch("")}
                    className="hover:text-amber-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-amber-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-amber-100 font-medium">Loading Naruto data...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white bg-opacity-90 rounded-xl p-8 text-center">
            <p className="text-xl text-amber-800">No results found for "{search}"</p>
            <p className="text-amber-600 mt-2">Try another search term or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-5">
                  {renderCardContent(item)}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center text-amber-200 text-sm">
          <p>Data provided by Dattebayo API • {filteredData.length} results</p>
        </div>
      </div>
    </div>
  );
};

export default App;