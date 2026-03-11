import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { VenueCard } from "@/components/VenueCard";
import { VenueMap } from "@/components/VenueMap";
import { VenueFilters } from "@/components/VenueFilters";
import { venues } from "@/data/venues";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const parseCapacity = (cap: string): number => {
  const match = cap.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const Venues = () => {
  const [hoveredVenueId, setHoveredVenueId] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = translations[language].venues;
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const locationType = searchParams.get("type")?.split(",").filter(Boolean) || [];
  const pricing = searchParams.get("pricing")?.split(",").filter(Boolean) || [];
  const regions = searchParams.get("region")?.split(",").filter(Boolean) || [];
  const maxCapacity = searchParams.get("capacity") || "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const setSearch = (v: string) => updateParam("q", v);
  const setLocationType = (v: string[]) => updateParam("type", v.join(","));
  const setPricing = (v: string[]) => updateParam("pricing", v.join(","));
  const setRegions = (v: string[]) => updateParam("region", v.join(","));
  const setMaxCapacity = (v: string) => updateParam("capacity", v);

  const clearFilters = () => setSearchParams({});

  const hasActiveFilters =
    !!search || locationType.length > 0 || pricing.length > 0 || regions.length > 0 || !!maxCapacity;

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      if (search) {
        const name = language === "en" ? venue.name : venue.nameArm;
        if (!name.toLowerCase().includes(search.toLowerCase())) return false;
      }
      if (locationType.length > 0 && !locationType.includes(venue.locationType)) return false;
      if (pricing.length > 0 && !pricing.includes(venue.pricing)) return false;
      if (regions.length > 0 && !regions.includes(venue.region)) return false;
      if (maxCapacity) {
        const cap = parseCapacity(venue.capacity);
        if (cap < parseInt(maxCapacity, 10)) return false;
      }
      return true;
    });
  }, [search, locationType, pricing, regions, maxCapacity, language]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 min-h-[600px]">
          {/* Venue Cards - Left Side */}
          <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t.partnerLocations}
            </h2>

        <VenueFilters
              search={search}
              onSearchChange={setSearch}
              locationType={locationType}
              onLocationTypeChange={setLocationType}
              pricing={pricing}
              onPricingChange={setPricing}
              regions={regions}
              onRegionsChange={setRegions}
              maxCapacity={maxCapacity}
              onMaxCapacityChange={setMaxCapacity}
              onClear={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {filteredVenues.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">{t.noResults}</p>
            ) : (
              filteredVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  isHovered={hoveredVenueId === venue.id}
                  onHover={setHoveredVenueId}
                  language={language}
                />
              ))
            )}
          </div>

          {/* Map - Right Side */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="sticky top-24 h-[500px] lg:h-[600px]">
              <VenueMap
                hoveredVenueId={hoveredVenueId}
                onMarkerHover={setHoveredVenueId}
                language={language}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Venues;
