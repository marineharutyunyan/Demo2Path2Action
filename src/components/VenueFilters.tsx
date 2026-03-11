import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { venues } from "@/data/venues";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { ChevronDown } from "lucide-react";
import {useLanguage} from "@/contexts/LanguageContext.tsx";
import {translations} from "@/lib/translations.ts";

interface VenueFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  locationType: string[];
  onLocationTypeChange: (value: string[]) => void;
  pricing: string[];
  onPricingChange: (value: string[]) => void;
  regions: string[];
  onRegionsChange: (value: string[]) => void;
  maxCapacity: string;
  onMaxCapacityChange: (value: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const availableRegions = [...new Set(venues.map((v) => v.region))];

const capacityOptions = [
  { label: "50+", value: "50" },
  { label: "100+", value: "100" },
  { label: "150+", value: "150" },
  { label: "200+", value: "200" },
  { label: "300+", value: "300" },
];

export const VenueFilters = ({
  search,
  onSearchChange,
  locationType,
  onLocationTypeChange,
  pricing,
  onPricingChange,
  regions,
  onRegionsChange,
  maxCapacity,
  onMaxCapacityChange,
  onClear,
  hasActiveFilters,
}: VenueFiltersProps) => {
  const toggleArrayValue = (
    arr: string[],
    value: string,
    setter: (v: string[]) => void
  ) => {
    setter(
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
    );
  };

  const { language } = useLanguage();
  const t = translations[language].venues;

  return (
    <div className="space-y-3 mb-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="pl-9"
        />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Type filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              {t.filterByType}
              {locationType.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                  {locationType.length}
                </Badge>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-44 p-2 bg-popover border border-border shadow-lg z-50" align="start">
            {(["indoor", "outdoor"] as const).map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer text-sm"
              >
                <Checkbox
                  checked={locationType.includes(type)}
                  onCheckedChange={() =>
                    toggleArrayValue(locationType, type, onLocationTypeChange)
                  }
                />
                {type === "indoor" ? t.indoor : t.outdoor}
              </label>
            ))}
          </PopoverContent>
        </Popover>

        {/* Pricing filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              {t.filterByPricing}
              {pricing.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                  {pricing.length}
                </Badge>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-44 p-2 bg-popover border border-border shadow-lg z-50" align="start">
            {(["free", "paid"] as const).map((p) => (
              <label
                key={p}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer text-sm"
              >
                <Checkbox
                  checked={pricing.includes(p)}
                  onCheckedChange={() =>
                    toggleArrayValue(pricing, p, onPricingChange)
                  }
                />
                {p === "free" ? t.free : t.paid}
              </label>
            ))}
          </PopoverContent>
        </Popover>

        {/* Region filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              {t.filterByRegion}
              {regions.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                  {regions.length}
                </Badge>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-popover border border-border shadow-lg z-50" align="start">
            {availableRegions.map((region) => (
              <label
                key={region}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer text-sm"
              >
                <Checkbox
                  checked={regions.includes(region)}
                  onCheckedChange={() =>
                    toggleArrayValue(regions, region, onRegionsChange)
                  }
                />
                {language === "en"
                  ? region
                  : venues.find((v) => v.region === region)?.regionArm ?? region}
              </label>
            ))}
          </PopoverContent>
        </Popover>

        {/* Capacity filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              {t.filterByCapacity}
              {maxCapacity && (
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                  {maxCapacity}+
                </Badge>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-44 p-2 bg-popover border border-border shadow-lg z-50" align="start">
            {capacityOptions.map((opt) => (
              <button
                key={opt.value}
                className={`w-full text-left px-2 py-1.5 rounded text-sm hover:bg-accent ${
                  maxCapacity === opt.value ? "bg-accent font-medium" : ""
                }`}
                onClick={() =>
                  onMaxCapacityChange(maxCapacity === opt.value ? "" : opt.value)
                }
              >
                {opt.label}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        {/* Clear */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="gap-1 text-muted-foreground">
            <X className="w-3 h-3" />
            {t.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
};
