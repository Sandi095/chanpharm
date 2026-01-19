import {StoryblokServicePageHeader} from '@storyblok/types';
import {Section} from '@/components/atoms/section';
import {Container} from '@/components/atoms/container';
import {Header1} from '@/components/atoms/typography';
import {storyblokEditable} from '@storyblok/react/rsc';
import Image from 'next/image';

export const ServicePageHeader = ({
    blok,
}: {
    blok: StoryblokServicePageHeader;
}) => {
    const imageDimension = blok.image?.filename
        ? blok.image.filename.split('/')[5].split('x')
        : [];

    const image = blok.image
        ? {
              src: blok.image.filename,
              alt: blok.image.alt,
              width: parseInt(imageDimension[0]),
              height: parseInt(imageDimension[1]),
          }
        : null;
    return (
        <Container {...storyblokEditable(blok)}>
            <Section className="py-0 lg:py-0">
                <div className="border-blue-grey relative grid border-b pt-28 pb-11 lg:grid-cols-2 lg:pt-32 lg:pb-32">
                    <Header1 className="text-balance">{blok.title}</Header1>
                    {image && image.src && (
                        <div className="hidden items-center justify-end transition-transform duration-1500 group-hover:rotate-360 lg:flex">
                            <Image
                                src={image?.src}
                                alt={image?.alt || blok.label}
                                width={image?.width}
                                height={image?.height}
                                className="w-32 object-contain object-center lg:w-46"
                            />
                        </div>
                    )}
                </div>
            </Section>
        </Container>
    );
};
