import React from 'react';
import {
    addDecorator,
    configure,
    storiesOf,
} from '@storybook/react';
import Wrapper from '~/components/routings/Wrapper';

const WrapperDecorator = storyFn => <Wrapper>{storyFn()}</Wrapper>;

const context = require.context('../src/components', ture, /\.stories.jsx?$/);

function getDirs(path) {
    return path.replace(/..?\//, '').split('/').reverse().slice(1).reverse();
}

function loadStories() {
    addDecorator(WrapperDecorator);
    context.keys().sort().forEach((c) => {
        const dirs = getDirs(c);
        if (!dirs.length) return;


        const stories = storiesOf(dirs.join('/'), module);
        context(c).default(stories);
    });
}

configure(loadStories, module);