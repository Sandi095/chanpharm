import {StoryblokHeroLink} from '@storyblok/types';
import Image from 'next/image';
import {FadeInUp} from '../atoms/fade-in-up';
import Link from 'next/link';
import {storyblokEditable} from '@storyblok/react/rsc';

export const HeroLink = ({blok}: {blok: StoryblokHeroLink}) => {
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
        <FadeInUp delay={0.2}>
            <Link
                href={blok.link.url || blok.link.cached_url}
                className="group flex flex-col items-center gap-6 lg:gap-8"
                {...storyblokEditable(blok)}
            >
                {image && image.src && (
                    <div className="transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src={image?.src}
                            alt={image?.alt || blok.label}
                            width={image?.width}
                            height={image?.height}
                            className="w-32 object-contain object-center lg:w-46"
                        />
                    </div>
                )}
                <div className="text-midnight flex h-10 w-40 items-center justify-center rounded-full bg-white px-7 text-center text-sm transition-transform duration-300 group-hover:scale-105 lg:h-16 lg:w-60 lg:text-xl">
                    <p className="text-balance">{blok.label}</p>
                </div>
            </Link>
        </FadeInUp>
    );
};
