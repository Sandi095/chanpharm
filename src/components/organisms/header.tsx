'use client';

import {ReactNode, useState, useRef, useEffect} from 'react';
import {
    CloseButton,
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react';
import {Menu, X, ChevronDown, ArrowDown} from 'lucide-react';
import {LogoBlack, LogoWhite} from '@/components/atoms/logo';
import {
    StoryblokHeader,
    StoryblokHeaderMenuAnchor,
    StoryblokHeaderMenuAnchorGroup,
    StoryblokHeaderMenuColumn,
    StoryblokHeaderMenuGroup,
    StoryblokHeaderMenuLink,
} from '@storyblok/types';
import Link from 'next/link';

import {useMeasure, useWindowScroll, useWindowSize} from '@uidotdev/usehooks';
import {cn} from '@/lib/utils';
import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';

const DesktopHeaderLink = ({
    children,
    href,
    className,
}: {
    children: ReactNode;
    href: string;
    className?: string;
}) => {
    return (
        <Link
            href={href}
            className={cn(
                'hover:text-cadmium-red text-lg font-semibold transition-colors duration-200',
                className
            )}
        >
            {children}
        </Link>
    );
};

const MobileLink = ({
    children,
    href,
    onClick,
}: {
    children: ReactNode;
    href: string;
    onClick: () => void;
}) => {
    return (
        <Link
            href={href}
            className="block w-full px-3 py-2 text-[2.8125rem] font-light text-white"
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

export const MenuLink = ({blok}: {blok: StoryblokHeaderMenuLink}) => {
    return (
        <Link
            href={`/${blok.link.url || blok.link.cached_url}`}
            className="text-cadmium-red text-xl leading-[2.8125rem] font-light lg:text-[2rem] lg:leading-[2.375rem]"
        >
            {blok.label}
        </Link>
    );
};

export const MenuAnchor = ({blok}: {blok: StoryblokHeaderMenuAnchor}) => {
    return (
        <Link
            href={`/${blok.link.url || blok.link.cached_url}#${blok.label
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')}`}
            className="text-midnight py-3 text-base font-light lg:text-xl"
        >
            {blok.label}
        </Link>
    );
};

export const MenuGroup = ({blok}: {blok: StoryblokHeaderMenuGroup}) => {
    return (
        <div
            className={cn(
                'flex flex-col',
                blok.hasAnchorGroup ? 'pb-10' : 'pb-5'
            )}
        >
            {blok.body?.map((nestedBlok) => (
                <StoryblokServerComponent
                    blok={nestedBlok}
                    key={nestedBlok._uid}
                />
            ))}
        </div>
    );
};

export const MenuAnchorGroup = ({
    blok,
}: {
    blok: StoryblokHeaderMenuAnchorGroup;
}) => {
    return (
        <div className="divide-blue-grey border-blue-grey flex flex-col divide-y border-b lg:pt-5">
            {blok.body?.map((nestedBlok) => (
                <StoryblokServerComponent
                    blok={nestedBlok}
                    key={nestedBlok._uid}
                />
            ))}
        </div>
    );
};

export const HeaderMenuColumn = ({blok}: {blok: StoryblokHeaderMenuColumn}) => {
    return (
        <div>
            {blok.body?.map((nestedBlok) => (
                <StoryblokServerComponent
                    blok={nestedBlok}
                    key={nestedBlok._uid}
                />
            ))}
        </div>
    );
};

const DesktopMenu = ({blok}: {blok: StoryblokHeader}) => {
    const size = useWindowSize();
    const [measureRef, {height}] = useMeasure();

    // Ref for the scrollable container
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    // Check scroll status of the container instead of window
    useEffect(() => {
        const container = scrollRef.current;

        if (!container) return;

        // Handler for scroll event
        const handleScroll = () => {
            const scrollTop = container.scrollTop;

            if (scrollTop > 0) {
                setShowScrollIndicator(false);
                setHasScrolled(true);
            } else {
                // Only show indicator if content is taller than container and user hasn't scrolled
                if (
                    size.height &&
                    height &&
                    size.height <= height &&
                    !hasScrolled
                ) {
                    setShowScrollIndicator(true);
                }
            }
        };

        // Initial check in case already scrolled
        handleScroll();

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [size.height, height, hasScrolled]);

    // Also update indicator if size or content height changes
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        if (
            size.height &&
            height &&
            size.height <= height &&
            !hasScrolled &&
            container.scrollTop === 0
        ) {
            setShowScrollIndicator(true);
        } else {
            setShowScrollIndicator(false);
        }
    }, [size.height, height, hasScrolled]);

    return (
        <>
            {showScrollIndicator && (
                <div className="bg-background-blue-grey/90 absolute bottom-0 left-0 z-60 w-full">
                    <div className="mx-auto flex max-w-7xl items-center justify-center py-5">
                        <ArrowDown
                            className="text-cadmium-red size-6"
                            strokeWidth={1}
                        />
                    </div>
                </div>
            )}
            <div ref={scrollRef} className="max-h-screen overflow-y-auto">
                <div ref={measureRef} className="relative px-6 xl:px-0">
                    <div className="mx-auto flex max-w-7xl items-center justify-between py-10">
                        <LogoBlack className="h-7 w-auto" />
                        <CloseButton className="text-cadmium-red cursor-pointer">
                            <X
                                className="text-cadmium-red size-6"
                                strokeWidth={3}
                            />
                        </CloseButton>
                    </div>

                    <div className="border-cadmium-red mx-auto flex max-w-7xl border-b pt-5 pb-10">
                        <p className="text-cadmium-red line text-[5rem] leading-[5.3125rem] font-light">
                            Services:
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-32 py-14">
                        {blok.services?.map((nestedBlok) => (
                            <StoryblokServerComponent
                                blok={nestedBlok}
                                key={nestedBlok._uid}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const MobileMenu = ({
    blok,
    onMobileMenuOpen,
}: {
    blok: StoryblokHeader;
    onMobileMenuOpen: (open: boolean) => void;
}) => {
    const size = useWindowSize();
    const [measureRef, {height}] = useMeasure();

    // Ref for the scrollable DialogPanel container
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    // Check scroll status of the container instead of window
    useEffect(() => {
        const container = scrollRef.current;

        if (!container) return;

        // Handler for scroll event
        const handleScroll = () => {
            const scrollTop = container.scrollTop;

            if (scrollTop > 0) {
                setShowScrollIndicator(false);
                setHasScrolled(true);
            } else {
                // Only show indicator if content is taller than container and user hasn't scrolled
                if (
                    size.height &&
                    height &&
                    size.height <= height &&
                    !hasScrolled
                ) {
                    setShowScrollIndicator(true);
                }
            }
        };

        // Initial check in case already scrolled
        handleScroll();

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [size.height, height, hasScrolled]);

    // Also update indicator if size or content height changes
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        if (
            size.height &&
            height &&
            size.height <= height &&
            !hasScrolled &&
            container.scrollTop === 0
        ) {
            setShowScrollIndicator(true);
        } else {
            setShowScrollIndicator(false);
        }
    }, [size.height, height, hasScrolled]);

    return (
        <DialogPanel
            ref={scrollRef}
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white pt-10 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
            {showScrollIndicator && (
                <div className="bg-background-blue-grey/90 fixed bottom-0 left-0 z-60 w-full">
                    <div className="mx-auto flex max-w-7xl items-center justify-center py-5">
                        <ArrowDown
                            className="text-cadmium-red size-6"
                            strokeWidth={1}
                        />
                    </div>
                </div>
            )}

            <div ref={measureRef}>
                <div className="flex items-center justify-between px-6">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">ChanParm</span>
                        <LogoBlack className="h-3.5 w-auto" />
                    </a>
                    <button
                        type="button"
                        onClick={() => onMobileMenuOpen(false)}
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Close menu</span>
                        <X
                            aria-hidden="true"
                            className="text-cadmium-red size-6"
                            strokeWidth={3}
                        />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <div className="border-cadmium-red mx-auto mb-10 flex border-b pt-5">
                        <p className="text-cadmium-red line text-[2.8125rem] leading-[3.125rem] font-light">
                            Services:
                        </p>
                    </div>
                    {blok.services?.map((nestedBlok) => (
                        <StoryblokServerComponent
                            blok={nestedBlok}
                            key={nestedBlok._uid}
                        />
                    ))}
                </div>

                <div className="bg-cadmium-red px-6 py-12">
                    <MobileLink
                        onClick={() => onMobileMenuOpen(false)}
                        href="/team"
                    >
                        Team
                    </MobileLink>
                    <MobileLink
                        onClick={() => onMobileMenuOpen(false)}
                        href="/career"
                    >
                        Career
                    </MobileLink>
                    <MobileLink
                        onClick={() => onMobileMenuOpen(false)}
                        href="/posts"
                    >
                        News
                    </MobileLink>
                    <MobileLink
                        onClick={() => onMobileMenuOpen(false)}
                        href="/contact"
                    >
                        Contact
                    </MobileLink>
                </div>
            </div>
        </DialogPanel>
    );
};

export const Header = ({
    blok,
    onGreyBackground,
}: {
    blok: StoryblokHeader;
    onGreyBackground?: boolean;
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [{y}] = useWindowScroll();
    const [isOverTransparentSection, setIsOverTransparentSection] =
        useState(!onGreyBackground);

    useEffect(() => {
        const checkTransparentSections = () => {
            const transparentElements = document.querySelectorAll(
                '.transparent-header'
            );
            const headerHeight = 80; // Approximate header height

            transparentElements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top;
                const elementBottom = rect.bottom;

                // Check if header is over this transparent section
                if (
                    elementTop <= headerHeight &&
                    elementBottom >= headerHeight
                ) {
                    setIsOverTransparentSection(true);
                    return;
                }
            });

            // If not over any transparent section, set to false
            const isOverAny = Array.from(transparentElements).some(
                (element) => {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top;
                    const elementBottom = rect.bottom;
                    return (
                        elementTop <= headerHeight &&
                        elementBottom >= headerHeight
                    );
                }
            );

            if (!isOverAny) {
                setIsOverTransparentSection(false);
            }
        };

        // Check on scroll and resize
        window.addEventListener('scroll', checkTransparentSections);
        window.addEventListener('resize', checkTransparentSections);

        // Initial check
        checkTransparentSections();

        return () => {
            window.removeEventListener('scroll', checkTransparentSections);
            window.removeEventListener('resize', checkTransparentSections);
        };
    }, []);

    return (
        <header
            className={cn(
                'bg-white',
                'fixed inset-x-0 top-0 isolate z-10 transition-colors duration-200',
                isOverTransparentSection && 'bg-transparent backdrop-blur-xs',
                onGreyBackground && y === 0 && 'bg-transparent',

                y && y > 0 && 'opacity-90'
            )}
            {...storyblokEditable(blok)}
        >
            <div className="relative">
                <nav
                    aria-label="Global"
                    className={cn(
                        'mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-200',
                        y && y > 0 ? 'py-4' : 'py-4 lg:py-10'
                    )}
                >
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">ChanParm</span>
                            {isOverTransparentSection ? (
                                <LogoWhite className="h-3.5 w-auto lg:h-7" />
                            ) : (
                                <LogoBlack className="h-3.5 w-auto lg:h-7" />
                            )}
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Menu
                                aria-hidden="true"
                                className="text-cadmium-red size-6"
                                strokeWidth={2}
                            />
                        </button>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        <Popover>
                            <PopoverButton
                                className={cn(
                                    'hover:text-cadmium-red group flex cursor-pointer items-center gap-x-1 text-lg font-semibold',
                                    isOverTransparentSection
                                        ? 'text-white'
                                        : 'text-midnight'
                                )}
                            >
                                Services
                                <ChevronDown
                                    aria-hidden="true"
                                    className={cn(
                                        'group-hover:text-cadmium-red size-5 flex-none',
                                        isOverTransparentSection
                                            ? 'text-white'
                                            : 'text-gray-400'
                                    )}
                                />
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className="absolute inset-x-0 top-0 bg-white transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                            >
                                <DesktopMenu blok={blok} />
                            </PopoverPanel>
                        </Popover>

                        <DesktopHeaderLink
                            className={cn(
                                isOverTransparentSection
                                    ? 'text-white'
                                    : 'text-midnight'
                            )}
                            href="/team"
                        >
                            Team
                        </DesktopHeaderLink>
                        <DesktopHeaderLink
                            className={cn(
                                isOverTransparentSection
                                    ? 'text-white'
                                    : 'text-midnight'
                            )}
                            href="/career"
                        >
                            Career
                        </DesktopHeaderLink>
                        <DesktopHeaderLink
                            className={cn(
                                isOverTransparentSection
                                    ? 'text-white'
                                    : 'text-midnight'
                            )}
                            href="/posts"
                        >
                            News
                        </DesktopHeaderLink>
                        <DesktopHeaderLink
                            className={cn(
                                isOverTransparentSection
                                    ? 'text-white'
                                    : 'text-midnight'
                            )}
                            href="/contact"
                        >
                            Contact
                        </DesktopHeaderLink>
                    </PopoverGroup>
                </nav>
            </div>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-50" />

                <MobileMenu blok={blok} onMobileMenuOpen={setMobileMenuOpen} />
            </Dialog>
        </header>
    );
};
