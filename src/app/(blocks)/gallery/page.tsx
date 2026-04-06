import { Card, CardContent } from "@/components/ui/card";
import { CategoryThumbnail } from "@/lib/category-thumbnails";
import { categorySlugs } from "@/lib/category-slugs";
import { ArrowUpRight } from "lucide-react";

export default function CategoriesGrid() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="overflow-hidden rounded-2xl bg-muted shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-0.5 space-y-0.5 sm:space-y-0 p-0.5">
        {categorySlugs.map((slug) => (
          <Card
            key={slug}
            className="group relative rounded-xl border-0 bg-card p-0 shadow-none hover:bg-muted/50 transition"
          >
            <CardContent className="p-6 aspect-square  relative">
              <div className="flex flex-col items-center justify-center h-full w-full shrink-0">
                {/* Thumbnail */}
                <div className="flex items-center justify-center shrink-0 flex-1 w-full h-full">
                  <CategoryThumbnail slug={slug} />
                </div>

                {/* Title */}
                <div className="mt-4 text-center">
                  <h3 className="text-base font-semibold text-foreground capitalize">
                    {slug.replace("-", " ")}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
