import Link from 'next/link';
import {
    Children,
    createElement,
    isValidElement,
    PropsWithChildren,
    ReactElement,
} from 'react';
import {
    BlockTypes,
    MarkTypes,
    StoryblokRichTextOptions,
    StoryblokRichTextResolvers,
} from '@storyblok/react/rsc';
import {LucideCheck, LucideMinus} from 'lucide-react';
import {Header2} from './atoms/typography';
import Image from 'next/image';

export const resolvers: StoryblokRichTextResolvers<React.ReactElement> = {
    [BlockTypes.UL_LIST]: (node) => {
        return <ul {...node.attrs}>{node.children}</ul>;
    },
    [BlockTypes.LIST_ITEM]: (node) => {
        return (
            <li className="flex items-center" {...node.attrs}>
                <LucideMinus className="mt-0.5 mr-2 h-5 w-5" />
                {node.children}
            </li>
        );
    },

    [MarkTypes.BOLD]: (node) => {
        return <span className="font-bold">{node.text}</span>;
    },

    [BlockTypes.HEADING]: (node) => {
        if (node.attrs?.level === 2) {
            return (
                <Header2
                    className="text-base leading-6 font-bold lg:text-xl lg:leading-[1.875rem]"
                    {...node.attrs}
                >
                    {node.children}
                </Header2>
            );
        }
        if (node.attrs?.level === 3) {
            return (
                <Header2
                    className="text-base leading-6 font-bold lg:text-xl lg:leading-[1.875rem]"
                    {...node.attrs}
                >
                    {node.children}
                </Header2>
            );
        }
        return <h1 {...node.attrs}>{node.children}</h1>;
    },
    [BlockTypes.IMAGE]: (node) => {
        const imageDimension = node.attrs?.src
            ? node.attrs?.src.split('/')[5].split('x')
            : [];

        const image = node.attrs?.src
            ? {
                  src: node.attrs?.src,
                  alt: node.attrs?.alt,
                  width: parseInt(imageDimension[0]),
                  height: parseInt(imageDimension[1]),
              }
            : null;

        return (
            image?.src && (
                <div className="flex h-auto w-full flex-col items-center py-4">
                    <Image
                        {...image}
                        alt={image?.alt || ''}
                        className="h-auto w-full object-contain object-center"
                    />
                    {node.attrs?.title && (
                        <p className="text-midnight pt-2 text-sm font-semibold">
                            {node.attrs?.title}
                        </p>
                    )}
                </div>
            )
        );
    },
    [MarkTypes.LINK]: (node) => {
        return (
            <Link href={node.attrs?.href || ''} className="underline">
                {node.text}
            </Link>
        );
    },
};

export const options: StoryblokRichTextOptions<ReactElement> = {
    renderFn: createElement,
    keyedResolvers: true,
    //@ts-ignore
    textFn: (text) => text,
    resolvers,
};

export const camelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

export const convertStyleStringToObject = (
    styleString: string
): {[key: string]: string} => {
    return styleString
        .split(';')
        .reduce((styleObject: {[key: string]: string}, styleProperty) => {
            let [key, value] = styleProperty.split(':');
            key = key?.trim();
            value = value?.trim();
            if (key && value) {
                styleObject[camelCase(key)] = value;
            }
            return styleObject;
        }, {});
};

export const convertAttributesInElement = (
    element: ReactElement | ReactElement[]
): ReactElement | ReactElement[] => {
    if (Array.isArray(element)) {
        return element.map((el) =>
            convertAttributesInElement(el)
        ) as React.ReactElement[];
    }

    // Base case: if the element is not a React element, return it unchanged.
    if (!isValidElement(element)) {
        return element;
    }

    // Convert attributes of the current element.
    const attributeMap: {[key: string]: string} = {
        class: 'className',
        for: 'htmlFor',
        targetAttr: 'targetattr',
        // Add more attribute conversions here as needed
    };

    const newProps: {[key: string]: unknown} = Object.keys(
        element.props as Record<string, unknown>
    ).reduce((acc: {[key: string]: unknown}, key) => {
        let value = (element.props as Record<string, unknown>)[key];

        if (key === 'style' && typeof value === 'string') {
            value = convertStyleStringToObject(value);
        }

        const mappedKey = attributeMap[key] || key;
        acc[mappedKey] = value;
        return acc;
    }, {});

    newProps.key = element.key as string;

    // Process children recursively.
    const children = Children.map(
        (element.props as PropsWithChildren).children,
        (child) => convertAttributesInElement(child as ReactElement)
    );
    const newElement = createElement(element.type, newProps, children);
    // Clone the element with the new properties and updated children.
    return newElement;
};
