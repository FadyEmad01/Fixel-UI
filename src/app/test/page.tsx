import OnHover01 from "@/content/components/on-hover/on-hover-01";
import { CategoryThumbnail } from "@/lib/category-thumbnails";

export default function TestPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <h1 className="text-2xl font-bold mb-8">Development Components Test</h1>

            <div className="space-y-8">
                {/* On-hover component */}
                <div className="text-center w-full  ">
                    <h2 className="text-lg font-semibold mb-4">On Hover Animation</h2>
                    <div className="flex justify-center flex-col w-full">
                        <CategoryThumbnail slug="on-hover" />
                        <OnHover01/>
                    </div>
                </div>

                {/* Add more test components here as needed */}
            </div>
        </div>
    );
}
