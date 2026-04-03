import Image from "next/image";
import { Button } from "@/components/registry/ui/button";

// Custom SVG Icon Components
const FacebookIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
    </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" />
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M16.5 7.5v.01" />
    </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 11v5" />
        <path d="M8 8v.01" />
        <path d="M12 16v-5" />
        <path d="M16 16v-3a2 2 0 1 0 -4 0" />
        <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
    </svg>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />
        <path d="M10 9l5 3l-5 3l0 -6" />
    </svg>
);

export default function Footer_02() {
    const company = [
        {
            title: "About Us",
            href: "#",
        },
        {
            title: "Careers",
            href: "#",
        },
        {
            title: "Brand assets",
            href: "#",
        },
        {
            title: "Privacy Policy",
            href: "#",
        },
        {
            title: "Terms of Service",
            href: "#",
        },
    ];

    const resources = [
        {
            title: "Blog",
            href: "#",
        },
        {
            title: "Help Center",
            href: "#",
        },
        {
            title: "Contact Support",
            href: "#",
        },
        {
            title: "Community",
            href: "#",
        },
        {
            title: "Security",
            href: "#",
        },
    ];

    const socialLinks = [
        {
            icon: FacebookIcon,
            link: "#",
            label: "Facebook",
        },
        {
            icon: GithubIcon,
            link: "#",
            label: "Github",
        },
        {
            icon: InstagramIcon,
            link: "#",
            label: "Instagram",
        },
        {
            icon: LinkedinIcon,
            link: "#",
            label: "LinkedIn",
        },
        {
            icon: XIcon,
            link: "#",
            label: "X",
        },
        {
            icon: YoutubeIcon,
            link: "#",
            label: "YouTube",
        },
    ];

    return (
        <>
            <footer className="relative bg-background overflow-hidden">
                {/* container */}
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col border-t gap-12 h-fit py-10">
                        {/* grid */}
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
                                <a className="w-max" href="#">
                                    <Image
                                        alt="fixel ui"
                                        src={"/logo-in-og.svg"}
                                        width={0}
                                        height={0}
                                        className="h-10 w-full"
                                    />
                                </a>
                                <p className="max-w-sm text-balance font-mono text-muted-foreground text-sm">
                                    A comprehensive financial technology platform.
                                </p>
                                <div className="flex gap-2">
                                    {socialLinks.map((item, index) => (
                                        <Button
                                            key={`social-${item.label}-${index}`}
                                            size="icon-sm"
                                            variant="outline"
                                            asChild
                                        >
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={item.label}
                                            >
                                                <item.icon className="size-3.5" />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-3 w-full md:col-span-1">
                                <span className="text-muted-foreground text-xs">Resources</span>
                                <div className="mt-2 flex flex-col gap-2">
                                    {resources.map(({ href, title }) => (
                                        <a
                                            className="w-max text-sm hover:underline"
                                            href={href}
                                            key={title}
                                        >
                                            {title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-3 w-full md:col-span-1">
                                <span className="text-muted-foreground text-xs">Company</span>
                                <div className="mt-2 flex flex-col gap-2">
                                    {company.map(({ href, title }) => (
                                        <a
                                            className="w-max text-sm hover:underline"
                                            href={href}
                                            key={title}
                                        >
                                            {title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="relative mt-10 flex flex-col items-center">
                            {/* Gradient Fade overlay */}
                            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black to-transparent h-full w-full pointer-events-none" />
                            <Image
                                src="/logo-in-og.svg"
                                width={0}
                                height={0}
                                sizes="100vw"
                                alt="fixel ui logo"
                                className="pointer-events-none w-full h-auto relative z-10 opacity-40"
                                style={{
                                    filter: "brightness(100%) grayscale(0%)",
                                    maskImage:
                                        "linear-gradient(to top, transparent 0%, var(--primary) 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to top, transparent 0%, var(--primary) 100%)",
                                }}
                            />
                            {/* Simple Copyright */}
                            <div className="flex justify-center items-center z-30 w-full">
                                <div className="text-sm text-text-secondary z-30">
                                    © {new Date().getFullYear()}{" "}
                                    <span className="text-foreground">xperience</span>. All rights
                                    reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 md:w-[800px] md:h-[400px] w-[200px] h-[400px] bg-green-900/40 opacity-50 blur-[120px] rounded-full pointer-events-none z-0" />
            </footer>
        </>
    );
}