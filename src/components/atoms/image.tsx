import {StoryblokImageBlock} from '@storyblok/types';
import Image from 'next/image';
import {Section} from './section';
import {Container} from './container';

export const ImageBlock = ({blok}: {blok: StoryblokImageBlock}) => {
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

    return image && image?.src ? (
        <Image
            src={image?.src}
            alt={image?.alt || blok.label}
            width={image?.width}
            height={image?.height}
            className="transparent-header h-full w-full object-cover object-center"
        />
    ) : null;
};
