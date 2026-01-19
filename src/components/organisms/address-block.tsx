import {StoryblokAddressBlock} from '@storyblok/types';
import {Section} from '@/components/atoms/section';
import {storyblokEditable} from '@storyblok/react/rsc';
import {Container} from '../atoms/container';
import {Header4} from '../atoms/typography';
import Link from 'next/link';

export const AddressBlock = ({blok}: {blok: StoryblokAddressBlock}) => {
    return (
        <Section
            className="bg-background-blue-grey py-14 lg:py-25"
            {...storyblokEditable(blok)}
        >
            <Container className="space-y-10 lg:space-y-25 lg:px-25.5">
                <div className="lg:space-y-4">
                    <Header4 className="text-xl leading-[1.875rem] font-medium lg:text-[1.875rem] lg:leading-[2.375rem]">
                        <span className="text-cadmium-red font-bold">:</span>{' '}
                        {blok.address1Title}
                    </Header4>
                    <p className="text-midnight text-xl leading-[1.875rem] font-light lg:text-[2rem] lg:leading-[2.5rem]">
                        {blok.address1}
                    </p>
                </div>

                <div className="lg:space-y-4">
                    <Header4 className="text-xl leading-[1.875rem] font-medium lg:text-[1.875rem] lg:leading-[2.375rem]">
                        <span className="text-cadmium-red font-bold">:</span>{' '}
                        {blok.address2Title}
                    </Header4>
                    <p className="text-midnight text-xl leading-[1.875rem] font-light lg:text-[2rem] lg:leading-[2.5rem]">
                        {blok.address2}
                    </p>
                </div>

                <div className="lg:space-y-4">
                    <Header4 className="text-xl leading-[1.875rem] font-medium lg:text-[1.875rem] lg:leading-[2.375rem]">
                        <span className="text-cadmium-red font-bold">:</span>{' '}
                        {blok.followUsTitle}
                    </Header4>
                    <Link
                        href={
                            blok.followUsLink.url ||
                            blok.followUsLink.cached_url
                        }
                        className="text-midnight text-xl leading-[1.875rem] font-light lg:text-[2rem] lg:leading-[2.5rem]"
                    >
                        {blok.followUsLabel}
                    </Link>
                </div>
            </Container>
        </Section>
    );
};
