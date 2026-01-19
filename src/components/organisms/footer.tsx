import {StoryblokFooter} from '@storyblok/types';
import {Section} from '@/components/atoms/section';
import {Container} from '@/components/atoms/container';
import Link from 'next/link';
import {PartOfInverted} from '@/components/atoms/icons';
import {storyblokEditable} from '@storyblok/react/rsc';

export const Footer = ({blok}: {blok: StoryblokFooter}) => {
    return (
        <Section className="bg-midnight" {...storyblokEditable(blok)}>
            <Container className="space-y-10">
                <p className="text-blue-grey text-[2rem] leading-[2.6875rem] font-light">
                    {blok.title}
                </p>
                <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-x-32">
                    <div className="text-blue-grey order-1 space-y-5">
                        <p className="border-blue-grey border-b pb-4 text-xl font-medium">
                            <span className="text-cadmium-red font-bold">
                                :
                            </span>{' '}
                            {blok.address1Title}
                        </p>
                        <p className="text-base leading-[1.625rem]">
                            {blok.address1Line1} <br /> {blok.address1Line2}
                        </p>
                    </div>

                    <div className="text-blue-grey order-3 space-y-5 lg:order-2">
                        <p className="border-blue-grey border-b pb-4 text-xl font-medium">
                            <span className="text-cadmium-red font-bold">
                                :
                            </span>{' '}
                            {blok.emailTitle}
                        </p>
                        <p className="text-base leading-[1.625rem]">
                            {blok.email}
                        </p>
                    </div>

                    <div className="text-blue-grey order-5 space-y-5 lg:order-3">
                        <p className="border-blue-grey border-b pb-4 text-xl font-medium">
                            <span className="text-cadmium-red font-bold">
                                :
                            </span>{' '}
                            Follow
                        </p>
                        <p className="text-base leading-[1.625rem]">
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/company/chanpharm/"
                            >
                                LinkedIn
                            </Link>
                        </p>
                    </div>

                    <div className="text-blue-grey order-2 space-y-5 lg:order-4">
                        <p className="border-blue-grey border-b pb-4 text-xl font-medium">
                            <span className="text-cadmium-red font-bold">
                                :
                            </span>{' '}
                            {blok.address2Title}
                        </p>
                        <p className="text-base leading-[1.625rem]">
                            {blok.address2Line1} <br /> {blok.address2Line2}
                        </p>
                    </div>

                    <div className="text-blue-grey order-4 space-y-5 lg:order-5">
                        <p className="border-blue-grey border-b pb-4 text-xl font-medium">
                            <span className="text-cadmium-red font-bold">
                                :
                            </span>{' '}
                            {blok.phoneTitle}
                        </p>
                        <p className="text-base leading-[1.625rem]">
                            {blok.phone1} <br />
                            {blok.phone2}
                        </p>
                    </div>

                    <PartOfInverted className="order-6 h-36 w-auto" />
                </div>

                <div className="text-blue-grey flex items-center justify-between gap-4 pt-10 text-sm">
                    <div className="flex gap-2">
                        <Link href="/imprint">Imprint</Link>|
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </div>

                    <div>
                        © {new Date().getFullYear()} - All rights reserved.
                    </div>
                </div>
            </Container>
        </Section>
    );
};
