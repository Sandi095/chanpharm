import {StoryblokPartner} from '@storyblok/types';

import Image from 'next/image';

export const Partner = ({blok}: {blok: StoryblokPartner}) => {
    const imageDimension = blok.logo?.filename
        ? blok.logo.filename.split('/')[5].split('x')
        : [];

    const image = blok.logo
        ? {
              src: blok.logo.filename,
              alt: blok.logo.alt,
              width: parseInt(imageDimension[0]),
              height: parseInt(imageDimension[1]),
          }
        : null;
    return (
        <div className="space-y-8">
            {image && image.src && (
                <Image
                    src={image?.src}
                    alt={image?.alt || blok.label}
                    width={image?.width}
                    height={image?.height}
                    className="h-12 w-auto object-contain object-center"
                />
            )}
            <p className="text-base leading-6 font-light">{blok.description}</p>
        </div>
    );
};
